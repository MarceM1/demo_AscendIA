import { DecisionOutcome } from "../types/decisionOutcome";
import { SessionRuntimeAdapter } from "../types";

export class DecisionExecutor {
  constructor(private readonly adapter: SessionRuntimeAdapter) {}

  execute(outcome: DecisionOutcome): void {
    switch (outcome.type) {
      case "ADVANCE_PHASE":
        this.adapter.transitionTo(outcome.to, outcome.reasons);
        break;

      case "COMPLETE_INTERVIEW":
        this.adapter.complete(outcome.reasons);
        break;

      case "NO_OP":
        // log / ignore
        break;
    }
  }
}