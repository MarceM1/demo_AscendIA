import { buildAgentBridgeInput } from "../agent-bridge/buildAgentBridgeInput";
import { MockAgentBridge } from "../agent-bridge/mockAgentBridge";
import { InterviewRuntimeManager } from "../runtime/runtimeManager";
import {
  InterviewAgentConfig,
  InterviewEngineState,
  InterviewSessionContext,
} from "../types";

async function runAgentBridgeFlowTest() {

console.log("Starting Agent Bridge Flow Test...");
console.log("Building initial state...");
  // Estado inicial
  const initialState: InterviewEngineState = {
    phase: "EXPLORATION",
    meta: {
      dificultyAdjusted: false,
      followUpsTriggered: 0,
      deepDiveTriggered: false,
    },
  };

  console.log('Building Agent Bridge Input...');
  //Construir el input para el agente
  const agentInput = buildAgentBridgeInput({
    session: {
      sessionId: "session_123",
      interviewId: "interview_456",
      userId: "user_789",
      area: "TECNOLOGIA_IT",
      position: "Desarrollador de Software",
      interviewer: "LUCIANA",
    } as InterviewSessionContext,

    state: initialState,

    agentConfig: {
      agentId: "agent_001",
      prompt:
        "Eres un agente de entrevista que ayuda a evaluar candidatos para roles técnicos.",
      version: 1,
      createdBy: "SYSTEM",
    } as InterviewAgentConfig,

    policy: "default-policy-v1",
    lastUserMessage: "Hola, me gustaría saber más sobre el puesto.",
  });

  console.log("=== Agent Bridge input ===");
  console.log(agentInput);

  //Ejecutar el agente (mock)
  console.log("Running Mock Agent Bridge...");
  const agentBridge = new MockAgentBridge();
  const agentOutput = await agentBridge.run(agentInput);

  console.log("=== Agent Bridge output ===");
  console.log(agentOutput);

  //Procesar la respuesta del agente en el runtime
  const runtime = new InterviewRuntimeManager();

  const runtimeResult = await runtime.handle({
    session: agentInput.session,
    state: initialState,
    agentMessage: agentOutput.agentMessage,
  });

  console.log("=== Runtime output ===");
  console.log(runtimeResult);

  // Validaciones simples
  if (!runtimeResult.nextState) {
    throw new Error("El runtime no devolvió un nextState válido.");
  }
  console.log("Test completed successfully.");
}

// Ejecutar la prueba
runAgentBridgeFlowTest().catch((err) => {
  console.error("Test failed with error:", err);
});
