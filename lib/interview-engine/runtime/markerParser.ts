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
      switch (type) {
  case "SIGNAL_UPDATE": {
    if (!Array.isArray(data.signals)) {
      console.warn("Invalid SIGNAL_UPDATE payload:", data);
      continue;
    }

    markers.push({
      type: "SIGNAL_UPDATE",
      signals: data.signals,
    });
    break;
  }

  case "AXIS_EVALUATION": {
    if (
      typeof data.axis !== "string" ||
      typeof data.score !== "number"
    ) {
      console.warn("Invalid AXIS_EVALUATION payload:", data);
      continue;
    }

    markers.push({
      type: "AXIS_EVALUATION",
      axis: data.axis,
      score: data.score,
    });
    break;
  }

  case "WEAKNESS_DETECTED": {
    if (typeof data.label !== "string") continue;

    markers.push({
      type: "WEAKNESS_DETECTED",
      label: data.label,
    });
    break;
  }

  case "STRENGTH_DETECTED": {
    if (typeof data.label !== "string") continue;

    markers.push({
      type: "STRENGTH_DETECTED",
      label: data.label,
    });
    break;
  }

  case "SUGGEST_PHASE_ADVANCE": {
    if (typeof data.to !== "string") continue;

    markers.push({
      type: "SUGGEST_PHASE_ADVANCE",
      to: data.to,
    });
    break;
  }
}

    } catch (error) {
      console.warn("Invalid agent marker payload:", error);
      continue;
    }
  }

  return markers;
}
