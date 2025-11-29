import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardUI from "./DashboardUI";

export default async function DashboardWrapper() {
    const {userId} = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <DashboardUI />
    )
}