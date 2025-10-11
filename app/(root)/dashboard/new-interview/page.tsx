'use client'
import DashboardHeader from '@/components/DashboardHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import { useDashboardPath } from '@/hooks/useDashboardPath'
import {useClerk} from '@clerk/nextjs'
const NuevaEntrevista =  () => {

  const { user } = useClerk()
  const {cleanPath:path, cleanSubPath:subPath}= useDashboardPath()

  return (

    < section className="w-full h-full pr-2">

      <SidebarInset>
        <DashboardHeader path={path} userImg={user?.imageUrl || null}/>
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

export default NuevaEntrevista