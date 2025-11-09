import DashboardHeader from '@/components/DashboardHeader'
import Loader from '@/components/Loader'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Suspense } from 'react'

const Dashboard = () => {
  return (
    < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<Loader/>}>
          <DashboardHeader />
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

export default Dashboard