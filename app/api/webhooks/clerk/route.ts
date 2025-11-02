import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { syncUserWithDatabase } from "@/lib/actions/sync-user.action";
import { db, users } from "@/database/db"; // tabla de logs opcional
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;
  const wh = new Webhook(WEBHOOK_SECRET);

  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  interface WebhookEvent {
    type: string;
    data: {
      id: string;
      email:string,
      email_addresses?: { email_address: string }[];
      first_name?: string;
      last_name?: string;
      image_url?: string;
    };
  }
  
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

  const eventType = evt.type;
  const data = evt.data;

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

    // log simple en la DB (opcional)
    // await db.insert(webhookLogs).values({
    //   eventId: svix_id,
    //   eventType,
    //   userId: data.id,
    //   status: "success",
    //   createdAt: new Date(),
    // });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Webhook error:", err);

    // await db.insert(webhookLogs).values({
    //   eventId: svix_id,
    //   eventType,
    //   userId: data.id,
    //   status: "failed",
    //   errorMessage: err.message,
    // });
    return new Response("Error processing webhook", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
