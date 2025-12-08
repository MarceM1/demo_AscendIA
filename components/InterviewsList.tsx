import { getInterviews } from '@/lib/actions/interviews/get-interviews.actions';
import { getInternalUser } from '@/lib/auth/getInternalUser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { cn } from '@/lib/utils';

const InterviewsList = async () => {
  const user = await getInternalUser();

  if (!user) {
    return (
      <p className="p-8 text-red-500">
        Debes iniciar sesión para ver tus entrevistas.
      </p>
    );
  }

  const { internalId } = user
  const result = await getInterviews(internalId);

  if (!result.success) {
    return <p className="p-8">Error: {result.message}</p>;
  }

  const data = result.data.interviews;
  console.log('data: ', data);

  return (
    <section className="w-4xl mx-auto">


      {data.length === 0 && (
        <article className='className="border border-base-border bg-background-light p-4 rounded-xl'>
          <p className="text-foreground-muted">
            Todavía no creaste ninguna entrevista.
          </p>
        </article>

      )}

      <div className="space-y-4">
        {data.map((item) => (
          <article
            key={item.id}
            className="border border-base-border bg-background-light p-4 rounded-xl flex justify-between"
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-medium text-foreground-muted text-2xl mb-2">{item.position}</h2>

              <div className="flex gap-2 items-center text-sm">
                <Badge style={{ backgroundColor: `${item.areaDetails?.color}`}} className={` py-1 px-3 flex items-center justify-center `}><p className='text-xs text-background-base'>{item.areaDetails?.label}</p></Badge>
                <Badge className='bg-background-dark py-1 px-3 flex items-center justify-center  '><p style={{ color: item.interviewerDetails?.color }} className='font-bold text-xs '>{item.interviewerDetails?.label}</p></Badge>
              </div>
              
              <div className="flex items-center gap-5 mt-2">
                <p className="text-xs text-foreground-base ">
                Creada el: <span className='text-foreground-muted'>{item.createdAt?.toLocaleDateString()}</span>
              </p>
              <p className='text-xs text-foreground-base'>Score general: <span className='text-foreground-muted'>{item.score=== null ? '- -' : <Badge className={cn('py-1 px-3 flex items-center justify-center', item.score <= 29 ? 'bg-red-300' : item.score >= 30 && item.score <= 69 ? 'bg-yellow-300' : 'bg-green-300')}>{item.score}</Badge>}</span></p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end justify-center">
              
                <Link href={`/dashboard/my-interviews/${item.id}/simulate`}   className='cursor-pointer'>
                  <Button aria-label="Simular entrevista" size="sm" className="w-[95px] bg-background-base border border-base-border font-semibold text-foreground-base  gradient-hover shadow_sm-hover cursor-pointer">
                    Simular
                  </Button>
                </Link>
              
                <Link href={`/dashboard/my-interviews/${item.id}`}  >
                  <Button aria-label="Ver feedback de la entrevista" size="sm"  disabled={item.score === null} className="w-[95px] font-semibold text-foreground-base  hover:bg-accent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-base-border">
                    Feedback
                  </Button>
                </Link> 
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InterviewsList