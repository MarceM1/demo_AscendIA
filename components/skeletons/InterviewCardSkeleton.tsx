import React from 'react'
import { Skeleton } from '../ui/skeleton'

const InterviewCardSkeleton = () => {
  return (
    <div className="border border-base-border bg-background-light p-4 rounded-xl flex justify-between max-w-full">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-3">
        
        {/* Position title */}
        <Skeleton className="h-6 w-40 mb-2" />

        {/* Badges */}
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
        </div>

        {/* Dates + Score */}
        <div className="flex items-center gap-5 mt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-col gap-2 items-end justify-center">
        <Skeleton className="h-8 w-[95px] rounded-md" />
        <Skeleton className="h-8 w-[95px] rounded-md" />
      </div>
    </div>
  )
}

export default InterviewCardSkeleton