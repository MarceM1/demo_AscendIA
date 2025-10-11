import { DashSidebar } from "@/components/Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth, currentUser } from "@clerk/nextjs/server"


export default async function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  const { isAuthenticated: authenticatedUser, redirectToSignIn } = await auth()
  const user = await currentUser()
  const userData = JSON.stringify(user, null, 2)

  if (!authenticatedUser) return redirectToSignIn()


  return (
    <SidebarProvider className="!min-h-dvh ">
        <DashSidebar imgUrl={user?.imageUrl || ''} user={userData || null || undefined} />
      <main className="w-full  !min-h-dvh ">
        
        {children}
      </main>
    </SidebarProvider>
  )
}

