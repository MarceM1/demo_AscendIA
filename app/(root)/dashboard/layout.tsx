import Loader from "@/components/Loader"
import { DashSidebar } from "@/components/Sidebar"
import { SidebarClientWrapper } from "@/components/SidebarClientWrapper"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Suspense } from "react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authResult, user] = await Promise.all([auth(), currentUser()])
  const { isAuthenticated, redirectToSignIn } = authResult

  if (!isAuthenticated) return redirectToSignIn()

  const Safeuser = {
    id: user!.id,
    firstName: user!.firstName,
    lastName: user!.lastName,
    imageUrl: user!.imageUrl ?? "",
    username: user!.username,
    emailAddresses: user!.emailAddresses.map(e => e.emailAddress),
  }

  return (
    <SidebarClientWrapper>
      <Suspense fallback={<Loader />}>
        <DashSidebar imgUrl={Safeuser.imageUrl} user={Safeuser} />
      </Suspense>

      <main className="w-full min-h-dvh">
        {children}
      </main>
    </SidebarClientWrapper>
  )
}
