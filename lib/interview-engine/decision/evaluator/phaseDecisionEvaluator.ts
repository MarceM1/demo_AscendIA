import { InterviewEngineState } from "../../types";
import { PhaseRuleSet } from "../rules/phaseRuleSet";
import { DecisionReason } from "../phase/types";

export interface PhaseDecisionResult {
  readonly eligibility: boolean;
  readonly reasons: DecisionReason[];
}

export class PhaseDecisionEvaluator {
  evaluate(
    state: InterviewEngineState,
    rules: PhaseRuleSet
  ): PhaseDecisionResult {
    const results = rules.conditions.map((condition) =>
      condition.evaluate(state)
    );

    const eligibility =
      rules.mode === "ALL"
        ? results.every(res => res.passed)
        : results.some(res => res.passed);

    const reasons = results.flatMap(res => res.reasons);

    return {
      eligibility,
      reasons,
    };
  }
}
