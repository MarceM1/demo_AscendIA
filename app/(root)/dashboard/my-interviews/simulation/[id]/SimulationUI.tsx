import SimulationInterview from '@/components/SimulationInterview'
import { notFound, redirect } from 'next/navigation'
import { getInternalUser } from '@/lib/auth/getInternalUser'
import { getInterviewById } from '@/lib/actions/interviews/get-interviewById.actions'
import { EnrichedInterview } from '@/database/types'

interface SimulationUIProps {
  interviewId: string
}

const SimulationUI = async ({ interviewId }: SimulationUIProps) => {
  // ---------- Auth ----------
  const user = await getInternalUser()

  if (!user) {
    console.warn('[SimulationUI] User not authenticated -> redirect')
    redirect('/sign-in')
  }

  // ---------- Param validation ----------
  if (!interviewId) {
    throw new Error('[SimulationUI] Missing interviewId param')
  }

  // ---------- Fetch interview ----------
  let interview
  try {
    const result = await getInterviewById(interviewId)

    if (!result?.success || !result.data) {
      console.warn(`[SimulationUI] Interview ${interviewId} not found`)
      notFound()
    }

    interview = result.data.interview as unknown as EnrichedInterview
    

  } catch (err) {
    console.error('[SimulationUI] Error fetching interview:', err)
    throw new Error('[SimulationUI] Failed to fetch interview data')
  }

  // ---------- Ownership check ----------
  const { internalId } = user
  if (interview.userId !== internalId) {
    console.warn(
      `[SimulationUI] Unauthorized access: user=${internalId}, interview=${interviewId}`
    )
    notFound()
  }

  // ---------- Render client component ----------
  return (
    <SimulationInterview  interview={interview}/> 
  )
}

export default SimulationUI
