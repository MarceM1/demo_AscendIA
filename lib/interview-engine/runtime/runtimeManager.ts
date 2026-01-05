import { InterviewEngineState } from "../types";
import { parseMarkers } from "./markerParser";
import { canAdvancePhase } from "./phaseGuards";
import { RuntimeInput, RuntimeManager, RuntimeOutput } from "./types";

export class InterviewRuntimeManager implements RuntimeManager {
  handle(input: RuntimeInput): RuntimeOutput {
    // console.log("Received Agent Message:", input.agentMessage);
    const markers = parseMarkers(input.agentMessage);
    // console.log("Parsed Markers:", markers);

    let nextState = {
      ...input.state,
      meta: { ...input.state.meta },
    } as InterviewEngineState;

    let suggestedPhase: RuntimeOutput["suggestedPhase"];

    for (const marker of markers) {
      switch (marker.type) {
        case "SIGNAL_UPDATE":
          console.log("SIGNAL_UPDATE marker:", marker);
          console.log("marker.signals:", marker.signals);
          {
            nextState = {
              ...nextState,
              signals: [...(nextState.signals ?? []), marker.signals],
            };
          }
          break;

        case "AXIS_EVALUATION":
          nextState.axisScores = {
            ...nextState.axisScores,
            [marker.axis]: marker.score,
          };
          break;

        case "WEAKNESS_DETECTED":
          nextState.detectedWeaknesses = [
            ...(nextState.detectedWeaknesses ?? []),
            marker.label,
          ];
          break;

        case "STRENGTH_DETECTED":
          nextState.detectedStrengths = [
            ...(nextState.detectedStrengths ?? []),
            marker.label,
          ];
          break;

        case "SUGGEST_PHASE_ADVANCE":
          if (canAdvancePhase(nextState.phase, marker.to)) {
            suggestedPhase = marker.to;
            nextState.phase = marker.to;
          }
          break;
      }
    }
    return {
      nextState,
      suggestedPhase,
      markers,
    };
  }
}
