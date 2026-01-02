import { AgentMarker, InterviewEngineState, InterviewSessionContext } from "../types";


export interface SessionRuntimeInput {
    session: InterviewSessionContext;
    state: InterviewEngineState;
    agentMessage: {
        content: string;
        timestamp: number;
    }
}

export interface SessionRuntimeResult {
    nextState: InterviewEngineState;
    markers: AgentMarker[];

    control:{
        phaseAdvanced: boolean;
        interviewCompleted: boolean;
    }
}