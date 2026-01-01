import { InterviewPhase } from "../types";

const PHASE_ORDER: InterviewPhase[] = [
  "ORIENTATION",
  "EXPLORATION",
  "EVALUATION",
  "CLOSING",
];

/**
 * Checks whether one interview phase is the immediate successor of another.
 *
 * @param current - The current interview phase.
 * @param next - The phase to test as the immediate successor of `current`.
 * @returns `true` if `next` immediately follows `current` in the configured phase order, `false` otherwise.
 */
export function canAdvancePhase(
  current: InterviewPhase,
  next: InterviewPhase
): boolean {
  return PHASE_ORDER.indexOf(next) === PHASE_ORDER.indexOf(current) + 1;
}
/**
 * Determines whether the given interview phase is the final phase.
 *
 * @param phase - The interview phase to check
 * @returns `true` if `phase` is the last phase in the configured phase order, `false` otherwise
 */
export function isFinalPhase(phase: InterviewPhase): boolean {
  return phase === PHASE_ORDER[PHASE_ORDER.length - 1];
}