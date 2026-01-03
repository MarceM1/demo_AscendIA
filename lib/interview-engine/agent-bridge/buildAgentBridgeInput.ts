import { AgentBridgeInput, BuildAgentInputParams } from "./types";

export function buildAgentBridgeInput(
    params: BuildAgentInputParams
):AgentBridgeInput {

    const {session, state, agentConfig, policy, lastUserMessage} = params;

    return {
        sessionId: session.sessionId,
        agentConfig,
        policy,
        state:{
            phase: state.phase,
            signals: state.signals,
            axisScores: state.axisScores,
            detectedStrengths: state.detectedStrengths,
            detectedWeaknesses: state.detectedWeaknesses,
        },
        userMessage: lastUserMessage ? lastUserMessage : undefined,
        }
    };
