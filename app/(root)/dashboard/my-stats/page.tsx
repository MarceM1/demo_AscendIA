import Loader from '@/components/Loader';
import { SidebarInset } from '@/components/ui/sidebar';
import { Metadata } from 'next';
import React, { Suspense } from 'react'


export const metadata: Metadata = {
  title: "AscendIA | Mis Estadísticas",
  description: "Panel de control de mis estadísticas en AscendIA",
  authors: [{ name: 'AscendIA', url: 'https://ascendia.ai' }],
};
const MyStats = () => {

  return (
    < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<Loader />}>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-background-base aspect-video rounded-xl" />
              <div className="bg-background-base aspect-video rounded-xl" />
              <div className="bg-background-base aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </Suspense>

      </SidebarInset>
    </section >
  )
}

export default MyStats