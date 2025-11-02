import { DashSidebar } from "@/components/Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Suspense } from "react"


export default async function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  const [authResult, user] = await Promise.all([auth(), currentUser()])
  const { isAuthenticated, redirectToSignIn } = authResult

  const authenticatedUser = isAuthenticated
  const userData = JSON.stringify(user, null, 2)

  if (!authenticatedUser) return redirectToSignIn()


  return (
    <SidebarProvider className="!min-h-dvh ">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <DashSidebar imgUrl={user?.imageUrl || ''} user={userData || null || undefined} />
      </Suspense>
      <main className="w-full  !min-h-dvh ">

        {children}
      </main>
    </SidebarProvider>
  )
}

