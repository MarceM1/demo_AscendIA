import { Suspense } from "react";
import InterviewsList from "@/components/InterviewsList";
import { InterviewsListSkeleton } from '@/components/skeletons/InterviewsListSkeleton';

export default function MyInterviewsUI() {
  return (
    <section className="p-8 max-w-6xl mx-auto flex flex-col gap-8 ">
      <div className="w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-foreground-base">
            Mis Entrevistas
          </h1>

          <p className="text-foreground-muted leading-relaxed">
            Este módulo reúne todas las entrevistas que generaste con AscendIA.
            Cada simulación está construida a partir de tus skills, tu experiencia real
            y el tipo de rol que querés alcanzar.
            Desde aquí podés retomar una práctica, revisar resultados anteriores o
            iniciar una nueva sesión personalizada.
          </p>
        </div>

        <p className="max-w-full w-4xl mx-auto border-l-4 border-l-accent pl-4 text-xl text-foreground-muted ">
          Las simulaciones se actualizan cada vez que mejorás tu perfil, así que tus
          prácticas siempre reflejan tu nivel actual.
        </p>
      </div>

      <div className="w-full mt-4">
        <Suspense fallback={<InterviewsListSkeleton />}>
          <InterviewsList />
        </Suspense>
      </div>
    </section>
  );
}
