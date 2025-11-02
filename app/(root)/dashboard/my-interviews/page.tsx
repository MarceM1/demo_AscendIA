'use server'
import type { Metadata } from "next";
import DashboardHeader from '@/components/DashboardHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import { currentUser } from '@clerk/nextjs/server'

import React, { Suspense } from 'react'
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "AscendIA | Mis Entrevistas",
  description: "Panel de control de Mis Entrevistas en AscendIA",
  authors: [{ name: 'AscendIA', url: 'https://ascendia.ai' }],
};
const MisEntrevistas = async () => {
  const user = await currentUser()

  return (
    < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<Loader/>}>
          <DashboardHeader  userImg={user?.imageUrl || null}/>
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

export default MisEntrevistas