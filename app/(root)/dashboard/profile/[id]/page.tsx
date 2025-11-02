
import DashboardHeader from "@/components/DashboardHeader"
import { SidebarInset } from "@/components/ui/sidebar"
import { currentUser, auth } from '@clerk/nextjs/server'
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "AscendIA | Mi Perfil",
  description: "Panel de control de mi perfil en AscendIA",
  authors: [{ name: 'AscendIA', url: 'https://ascendia.ai' }],
};

const UserProfile = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [authResult, user] = await Promise.all([auth(), currentUser()])
  const { isAuthenticated } = authResult
  

  if (!isAuthenticated) return redirect('/sign-in')
  if (!id) return <div>no user id</div>





  return (
    < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<div>Loading header...</div>}>
          <DashboardHeader userImg={user?.imageUrl || ''} />
        </Suspense>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-background-base aspect-video rounded-xl" />
            <div className="bg-background-base aspect-video rounded-xl" />
            <div className="bg-background-base aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </section >
  )
}

export default UserProfile