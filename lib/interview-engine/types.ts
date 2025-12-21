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

export type EvaluationAxis =
  | "fundamentals"
  | "reasoning"
  | "communication"
  | "architecture"
  | "senioritySignals";

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

export type HardConstraints = 

  | "Never break character"

  | "Never mention AscendIA internals"

  | "Never mention 'AI', 'model', or 'prompt'"

  | "Never skip phases"

  | "Never ask irrelevant or generic questions"

  | "Never optimize for friendliness over clarity"

  | "You are an evaluator, not a cheerleader.";



  export interface WeaknessDetected {
    label: string;
  }
  
  export interface StrengthDetected {
    label: string;
  }
  
  export interface BuildInterviewPolicyConfig {
    phases: InterviewPhase[];
    axes: EvaluationAxis[];
    constraints?: HardConstraints[];
  }

