import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class MinimumSignalsCondition implements PhaseCondition {
  constructor(private readonly minSignals: number) {}
  evaluate(state: InterviewEngineState): PhaseConditionResult {
    const signalCount = state.signals?.length || 0;

    const passed = signalCount >= this.minSignals;

    return {
      passed,
      reasons: passed
        ? []
        : [
            {
              code: "INSUFFICIENT_SIGNALS",
              description: `Insufficient signals: ${signalCount} < ${this.minSignals}`,
            },
          ],
    };
  }
}
