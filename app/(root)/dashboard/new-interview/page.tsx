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
const NewInterview =  () => {


  return (

    < section className="w-full h-full flex flex-col max-w-[1092px] mx-auto my-12" >
      <SidebarInset>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-foreground-base">Crear una nueva entrevista</h1>
          <p className="text-foreground-muted mt-1">
            Configurá el área, el entrevistador y el puesto para generar un simulacro realista.
          </p>
        </div>
        <div className="mb-12 border-l-4 border-accent pl-4">
          <p className="text-sm text-foreground-muted leading-relaxed">
            Las entrevistas generadas por AscendIA están diseñadas para evaluar tus habilidades
            técnicas y de comunicación con precisión. Seleccioná las opciones que mejor representen
            el trabajo al que apuntás.
          </p>
        </div>
        <Suspense fallback={<Loader />}>
          <NewInterviewForm />
        </Suspense>
        {/* <div className="flex items-center-safe justify-end-safe mt-8">
          <p className='text-sm text-foreground-muted'>¿No estás seguro qué elegir? Podés cambiar estas opciones en cualquier momento antes de iniciar la entrevista.</p>
        </div> */}
      </SidebarInset>
      
    </section >
  )
}

export default NewInterview