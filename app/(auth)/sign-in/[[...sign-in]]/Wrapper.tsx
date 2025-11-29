import { auth } from "@clerk/nextjs/server";
import LoginUI from "./LoginUI";
import { redirect } from "next/navigation";

export default async function LoginWrapper() {
  const { userId } = await auth();

  if (userId) redirect("/dashboard");

  return <LoginUI />;
}
