import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class DecisionReachedCondition implements PhaseCondition {
  evaluate(state: InterviewEngineState): PhaseConditionResult {
    const passed = (state.detectedStrengths?.length || 0) > 0;

    return {
      passed,
      reasons: passed
        ? []
        : [
            {
              code: "DECISION_NOT_REACHED",
              description: "No sufficient strengths detected to reach a decision",
            },
          ],
    };
  }
}
