/*
 * Parseo de Markers del Agente desde un string.
 * Version: 1.0.0
 */

// TODO: Agregar tests
// TODO: Validar type contra un enum real
// TODO: Contar markers inválidos como señal de drift del agente

import { AgentMarker } from "../types";

const MARKER_REGEX = /\{([A-Z_]+)\s*(\{[\s\S]*?\})\}/g;

const VALID_MARKER_TYPES = new Set<AgentMarker["type"]>([
  "SIGNAL_UPDATE",
  "AXIS_EVALUATION",
  "STRENGTH_DETECTED",
  "WEAKNESS_DETECTED",
  "SUGGEST_PHASE_ADVANCE",
]);

export function parseMarkers(message: string): AgentMarker[] {

  // console.log("Parsing markers from agent message...");
  const markers: AgentMarker[] = [];

  for (const match of message.matchAll(MARKER_REGEX)) {
    try {
      const type = match[1] as AgentMarker["type"];
      // console.log(`Found marker of type: ${type}`);

      if (!VALID_MARKER_TYPES.has(type)) {
        console.warn(`Unknown agent marker type: ${type}`);
        continue;
      }
      // console.log(`Marker type is valid: ${type}`);
      const rawPayload = match[2]?.trim();
      // console.log(`Raw payload: ${rawPayload}`);
      if (!rawPayload) continue;

      const data = JSON.parse(rawPayload);
      // console.log(`Parsed payload data:`, data);

      // TODO: Validar data por marker (zod, superstruct, etc.)
      markers.push({ type, ...data } as AgentMarker);
    } catch (error) {
      console.warn("Invalid agent marker payload:", error);
      continue;
    }
  }

  return markers;
}
