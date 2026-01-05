import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class MaxDecisionTimeExceededCondition implements PhaseCondition {
  evaluate(_: InterviewEngineState): PhaseConditionResult {
    return {
      passed: false,
      reasons: [
        {
          code: "MAX_DECISION_TIME_NOT_IMPLEMENTED",
          description:
            "Decision timeout condition not yet implemented",
        },
      ],
    };
  }
}
