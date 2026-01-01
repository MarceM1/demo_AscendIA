/*
 * Parseo de Markers del Agente desde un string.
 * Version: 1.0.0
*/

// TODO: Agregar tests
// TODO: Validar type contra un enum real
// TODO: Validar data por marker (zod, superstruct, etc.)
// TODO: Contar markers inválidos como señal de drift del agente

import { AgentMarker } from "../types";

const MARKER_REGEX = /\{([A-Z_]+)\s*([\s\S]*?)\}/g;

export function parseMarkers(message: string): AgentMarker[] {
  const markers: AgentMarker[] = [];

  for (const match of message.matchAll(MARKER_REGEX)) {
    try {
      const type = match[1] as AgentMarker["type"];
      const rawPayload = match[2]?.trim();

      if (!rawPayload) continue;

      const data = JSON.parse(rawPayload);

      markers.push({ type, ...data } as AgentMarker);
    } catch (error) {
      console.warn("Invalid agent marker payload:", error);
      continue;
    }
  }

  return markers;
}
