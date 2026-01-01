import { parseMarkers } from "./markerParser";
import { canAdvancePhase } from "./phaseGuards";
import { RuntimeInput, RuntimeManager, RuntimeOutput } from "./types";

export class InterviewRuntimeManager implements RuntimeManager {
  handle(input: RuntimeInput): RuntimeOutput {
    const markers = parseMarkers(input.agentMessage);

    const nextState = { ...input.state };
    let suggestedPhase: RuntimeOutput["suggestedPhase"];

    for (const marker of markers) {
      switch (marker.type) {
        case "SIGNAL_UPDATE":
          nextState.signals = {
            ...nextState.signals,
            ...marker.signals,
          };
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
      emittedMarker: input.agentMessage,
      suggestedPhase,
    };
  }
}
