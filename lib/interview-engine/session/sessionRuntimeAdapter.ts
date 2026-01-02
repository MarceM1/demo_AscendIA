import { parseMarkers } from "../runtime/markerParser";
import { isFinalPhase } from "../runtime/phaseGuards";
import { InterviewRuntimeManager } from "../runtime/runtimeManager";
import { SessionRuntimeInput, SessionRuntimeResult } from "./types";

export function runSessionRuntime(
  input: SessionRuntimeInput,
  runtime: InterviewRuntimeManager
): SessionRuntimeResult {
  const result = runtime.handle({
    session: input.session,
    state: input.state,
    agentMessage: input.agentMessage.content,
  });

  const phaseAdvanced = result.nextState.phase !== input.state.phase;

  const interviewCompleted = isFinalPhase(result.nextState.phase);

  return {
    nextState: result.nextState,
    markers: result.emittedMarker
      ? parseMarkers(result.emittedMarker) // Derivado del runtime-emitted agent output
      : [],
    control: {
      phaseAdvanced,
      interviewCompleted,
    },
  };
}
