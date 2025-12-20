import { EnrichedInterview } from '@/database/types'
import React from 'react'

const SimulationInterview = ({interview}: {interview: EnrichedInterview}) => {
    
  // console.log('interview: ', interview)

  return (
    <div >
    Interview ID: {interview.id}
    </div>
  )
}

export default SimulationInterview