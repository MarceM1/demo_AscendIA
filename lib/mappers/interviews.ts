import { AREAS, INTERVIEWERS } from "@/constants"
import { Interview } from "@/types/types"


export const enrichInterview = (interview: Interview) => {
    
    const area = AREAS.find(a => a.id === interview.area)
    const interviewer = INTERVIEWERS.find(a => a.id === interview.interviewer)
    
    return {
        ...interview,
        areaData: area  ?? null,
        interviewerData: interviewer ?? null,
    }
}

export const enrichInterviews = (interviews: Interview[]) => {
    return interviews.map(enrichInterview)
}