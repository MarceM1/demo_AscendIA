import { AreaEnum, InterviewerEnum, LanguageEnum } from "@/types/types";

export type InterviewPhase =
  | "ORIENTATION"
  | "EXPLORATION"
  | "EVALUATION"
  | "CLOSING";

/**
 * Immutable context for the interview session.
 * Defines domain and configuration, not cognitive state.
 */
export interface InterviewSessionContext {
  sessionId: string;
  interviewId: string;
  userId: string;
  area: AreaEnum;
  position?: string;
  interviewer: InterviewerEnum;
  language: LanguageEnum;
}

export interface InterviewAgentConfig {
  agentId?: string;
  prompt: string;
  version: number;

  createdAt?: string;
  createdBy: "SYSTEM" | "USER";
}

export interface CandidateSignalVector {
  clarity?: number;
  structure?: number;
  technicalPrecision?: number;
  senioritySignals?: number;
}

export interface AxisScore {
  fundamentals?: number;
  reasoning?: number;
  communication?: number;
  architecture?: number;
  senioritySignals?: number;
}

export interface InterviewEngineState {
  phase: InterviewPhase;
  signals?: CandidateSignalVector;
  axisScores?: AxisScore;
  detectedWeaknesses?: string[];
  detectedStrengths?: string[];

  meta: {
    dificultyAdjusted: boolean;
    followUpsTriggered: number;
    deepDiveTriggered: boolean;
  };
}

export type AgentMarker =
  | {
      type: "SIGNAL_UPDATE";
      signals: CandidateSignalVector;
    }
  | {
      type: "AXIS_EVALUATION";
      axis: keyof AxisScore;
      score: number;
    }
  | {
      type: "WEAKNESS_DETECTED";
      label: string;
    }
  | {
      type: "STRENGTH_DETECTED";
      label: string;
    }
  | {
      type: "SUGGEST_PHASE_ADVANCE";
      to: InterviewPhase;
    };
