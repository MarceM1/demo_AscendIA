import { InterviewPhase } from "../../types";
import { DecisionReason } from "../phase/types";

export type DecisionOutcome =
    | {
      type: "NO_OP";
      reasons: DecisionReason[];
    }
    | {
      type: "ADVANCE_PHASE";
      from: InterviewPhase;
      to: InterviewPhase;
      reasons: DecisionReason[];      
    }
    | {
      type: "COMPLETE_INTERVIEW";
      reasons: DecisionReason[];
    };