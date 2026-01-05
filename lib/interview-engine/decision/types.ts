import { InterviewEngineState, InterviewPhase } from "../types";
import { DecisionReason } from "./phase/types";

export interface SessionRuntimeAdapter {
    getState(): InterviewEngineState;
    complete(reasons: DecisionReason[]): void;
    transitionTo(phase: InterviewPhase, reasons: DecisionReason[]): void;
}