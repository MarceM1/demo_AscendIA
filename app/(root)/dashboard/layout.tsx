import DashboardHeader from "@/components/DashboardHeader"
import { DashSidebar } from "@/components/Sidebar"
import { SidebarClientWrapper } from "@/components/SidebarClientWrapper"
import { DashboardHeaderSkeleton } from "@/components/skeletons/DashboardHeaderSkeleton"
import { DashSidebarSkeleton } from "@/components/skeletons/DashSidebarSkeleton"
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
      <Suspense fallback={<DashSidebarSkeleton />}>
        <DashSidebar imgUrl={Safeuser.imageUrl} user={Safeuser} />
      </Suspense>
      <section className="flex flex-col w-screen overflow-hidden">
        <Suspense fallback={<DashboardHeaderSkeleton/>}>
          <DashboardHeader/>
        </Suspense>
      <main className="container mx-auto min-h-dvh " >
        {children}
      </main>
      </section>
    </SidebarClientWrapper>
  )
}
