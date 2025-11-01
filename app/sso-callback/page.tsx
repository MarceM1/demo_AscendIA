import { currentUser } from "@clerk/nextjs/server";
import { syncUserWithDatabase } from "@/lib/actions/sync-user.action";
import { redirect } from "next/navigation";

export default async function SsoCallbackPage() {
    const user = await currentUser();
    if (!user) return redirect('/sign-in');

    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) throw new Error("Usuario Clerk sin email válido");


    try {
        console.log('Iniciando Sincronizacion de usuario SSO...');

        await syncUserWithDatabase({
            clerkId: user.id,
            email,
            firstName: user.firstName ?? 'Usuario',
            lastName: user.lastName ?? '',
            imgUrl: user.imageUrl ?? null,
        })
    } catch (err) {
        console.error("Error en SSO Callback:", err);
        return redirect('/sign-in');
    }


    return redirect('/dashboard');
}