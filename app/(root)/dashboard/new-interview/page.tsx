import DashboardHeader from '@/components/DashboardHeader'
import Loader from '@/components/Loader'
import NewInterviewForm from '@/components/NewInterviewForm'
import { SidebarInset } from '@/components/ui/sidebar'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "AscendIA | Nueva Entrevista",
  description: "Generar una nueva entrevista en AscendIA",
  authors: [{ name: 'AscendIA', url: 'https://ascendia.ai' }],
};
const NewInterview = async () => {


  return (

    < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<Loader/>}>
          <DashboardHeader/>
        </Suspense>
        <div>NewInterviewForm</div>
        <Suspense fallback={<Loader/>}>
          <NewInterviewForm />
        </Suspense>  
      </SidebarInset>
    </section >
  )
}

export default NewInterview