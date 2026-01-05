import { isFinalPhase } from "../runtime/phaseGuards";
import { InterviewEngineState } from "../types";
import { DecisionOutcome } from "./types/decisionOutcome";
import { PhaseDecisionEvaluator } from "./evaluator/phaseDecisionEvaluator";
import { PhaseRuleSet } from "./rules/phaseRuleSet";

export class DecisionEngine {
  private readonly evaluator = new PhaseDecisionEvaluator();

  decide(
    state: InterviewEngineState,
    phaseRules: PhaseRuleSet[]
  ): DecisionOutcome {
    //Final phase check
    if (isFinalPhase(state.phase)) {
      return {
        type: "COMPLETE_INTERVIEW",
        reasons: [
          {
            code: "",
            description: `The interview has reached its final phase: ${state.phase}`,
            evidence: { phase: state.phase },
          },
        ],
      };
    }

    // Applicable rules
    const applicableRules = phaseRules.filter(
      (ruleSet) => ruleSet.fromPhase === state.phase
    );

    if (applicableRules.length === 0) {
      return {
        type: "NO_OP",
        reasons: [
          {
            code: "NO_RULES_APPLICABLE",
            description: `No rules are applicable for the current phase: ${state.phase}`,
            evidence: { phase: state.phase },
          },
        ],
      };
    }

    // Evaluate transitions
    const evaluated = applicableRules.map((ruleSet) => {
      const result = this.evaluator.evaluate(state, ruleSet);
      return { ruleSet, result };
    });

    const eligible = evaluated.filter((e) => e.result.eligibility);

    // Conflict handling
    if (eligible.length > 1) {
      throw new Error(`Ambiguous phasedecision from ${state.phase}.`);
    }

    if (eligible.length === 1) {
      const { ruleSet, result } = eligible[0];
      return {
        type: "ADVANCE_PHASE",
        from: ruleSet.fromPhase,
        to: ruleSet.toPhase,
        reasons: result.reasons,
      };
    }


    // Default NO_OP
    return {
      type: "NO_OP",
      reasons: evaluated.flatMap((e) => e.result.reasons),
    };
  }
}
