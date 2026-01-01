import { InterviewPhase } from "../types";

const PHASE_ORDER: InterviewPhase[] = [
  "ORIENTATION",
  "EXPLORATION",
  "EVALUATION",
  "CLOSING",
];

export function canAdvancePhase(
  current: InterviewPhase,
  next: InterviewPhase
): boolean {
  return PHASE_ORDER.indexOf(next) === PHASE_ORDER.indexOf(current) + 1;
}
export function isFinalPhase(phase: InterviewPhase): boolean {
  return phase === PHASE_ORDER[PHASE_ORDER.length - 1];
}