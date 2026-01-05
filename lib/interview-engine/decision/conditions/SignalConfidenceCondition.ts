import { InterviewEngineState } from "../../types";
import { PhaseCondition, PhaseConditionResult } from "../phase/phaseCondition";

export class SignalConfidenceCondition implements PhaseCondition {
  constructor(private threshold: number) {}
  evaluate(state: InterviewEngineState): PhaseConditionResult {
    // const confidence = state.signals?.[0].confidence || 0;

    // const passed = confidence >= this.threshold;
     const confidences = state.signals?.map(s => s.confidence)
   if (confidences.length === 0) {
      return {
        passed: false,
        reasons: [{
          code: "NO_SIGNALS_AVAILABLE",
          description: "Cannot evaluate confidence without signals.",
        }],
      };
    }

    const avgConfidence =
      confidences.reduce((sum, c) => sum + c, 0) / confidences.length;

    const passed = avgConfidence >= this.threshold;
    console.log("Average confidence:", avgConfidence);
    console.log("Passed?", passed);
    console.log("Threshold:", this.threshold);
    console.log("Confidences:", confidences);

    return {
        passed,
        reasons: passed
          ? []
          : [
              {
                code: "INSUFFICIENT_CONFIDENCE",
                description: `Insufficient confidence: ${confidences} < ${this.threshold}`,
              },
            ],
    }
  }
}
