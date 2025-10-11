

import DashboardHeader from "@/components/DashboardHeader"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { currentUser, auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { isAuthenticated } = await auth()
  const user = await currentUser()
  // console.log('user in userProfile: ', user)

  if (!id) return <div>no user id</div>

  if (!isAuthenticated) return redirect('/sign-in')




  return (
    < section className="w-full h-full pr-2">

      <SidebarInset>
        <DashboardHeader userImg={user?.imageUrl || ''}/>
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