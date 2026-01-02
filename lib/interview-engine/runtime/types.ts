import { AgentMarker, InterviewEngineState, InterviewPhase, InterviewSessionContext } from "../types";

export interface RuntimeInput {
    session: InterviewSessionContext;
    state: InterviewEngineState,
    agentMessage: string;
}

export interface RuntimeOutput {
    nextState: InterviewEngineState;
    markers: AgentMarker[];
    suggestedPhase?: InterviewPhase
    
}

export interface RuntimeManager {
    handle(input: RuntimeInput): RuntimeOutput;
}