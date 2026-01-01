import { InterviewEngineState, InterviewPhase, InterviewSessionContext } from "../types";

export interface RuntimeInput {
    session: InterviewSessionContext;
    state: InterviewEngineState,
    agentMessage: string;
}

export interface RuntimeOutput {
    nextState: InterviewEngineState;
    emittedMarker: string;
    suggestedPhase?: InterviewPhase
    
}

export interface RuntimeManager {
    handle(input: RuntimeInput): RuntimeOutput;
}