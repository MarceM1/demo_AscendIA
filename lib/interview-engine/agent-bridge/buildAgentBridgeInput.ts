import { isFinalPhase } from "../runtime/phaseGuards";
import { AgentBridgeInput, BuildAgentInputParams } from "./types";

export function buildAgentBridgeInput(
  params: BuildAgentInputParams,
  
): AgentBridgeInput {
  const { session, state, agentConfig, policy, lastUserMessage, } = params;

  return {
    session,
    agentConfig,
    policy,
    state,
    instructions:{
      currentPhase: state.phase,
      canSuggestPhaseAdvance: !isFinalPhase(state.phase),
    },
    userMessage: lastUserMessage ? lastUserMessage : undefined,
  };
}
