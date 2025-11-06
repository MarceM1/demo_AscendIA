import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { syncUserWithDatabase } from "@/lib/actions/sync-user.action";
import { db, users, webhookLogs } from "@/database/db";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // Verificar que la variable de entorno esté configurada
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET!;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SIGNING_SECRET env variable");
    return new Response("Server misconfiguration", { status: 500 });
  }

  // Crear una instancia del verificador de webhooks
  const wh = new Webhook(WEBHOOK_SECRET);

  // Obtener los encabezados necesarios para la verificación
  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  // Verificar que todos los encabezados estén presentes
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // Leer el cuerpo de la solicitud
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Definir la interfaz del evento del webhook
  interface WebhookEvent {
    id: string;
    type: string;
    data: {
      id: string;
      email: string;
      email_addresses?: { email_address: string }[];
      first_name?: string;
      last_name?: string;
      image_url?: string;
    };
  }

  // Verificar la firma del webhook
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error(" Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Extraer la información del evento
  const eventType = evt.type;
  const data = evt.data;
  const eventId = evt.id ?? 'UnknownEventId';
  const attempId = svix_id;
  const userId = data.id;

  // Registrar el evento del webhook en la base de datos
  try {
    await db
    .insert(webhookLogs)
    .values({
      eventId,
      eventType,
      userId,
      status: "received",
      errorMessage: null,
      payload: evt as unknown as Record<string, JSON>,
      processedAt: new Date(),
      attempId,
    })
    .onConflictDoNothing({ target: webhookLogs.eventId })
    .returning();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.error("Error logging webhook event:", err);
    return new Response("Error logging webhook event", { status: 500 });
  }

  // Procesar el evento del webhook
  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      await syncUserWithDatabase({
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address || data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        imgUrl: data.image_url,
      });
    } else if (eventType === "user.deleted") {
      // lógica de soft delete
      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    // Actualizar el estado del log del webhook a "processed"
    await db
      .update(webhookLogs)
      .set({
        status: "processed",
        processedAt: new Date(),
      })
      .where(eq(webhookLogs.eventId, eventId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Webhook error:", err);

    // Actualizar el estado del log del webhook a "error"
    await db
      .update(webhookLogs)
      .set({
        status: "failed",
        errorMessage: err.message,
        processedAt: new Date(),
      })
      .where(eq(webhookLogs.eventId, eventId));

    return new Response("Error processing webhook", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
