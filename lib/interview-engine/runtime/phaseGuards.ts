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
    const currentIndex = PHASE_ORDER.indexOf(current);
    const nextIndex = PHASE_ORDER.indexOf(next);

    if( currentIndex === -1 || nextIndex === -1 ) {
        console.warn(`Invalid phase(s) provided: current=${current}, next=${next}`);
        return false;
    }

    if(isFinalPhase(current)) {
        console.warn(`Current phase is final phase: ${current}`);
        return false;
    }

    return nextIndex === currentIndex + 1;
}
export function isFinalPhase(phase: InterviewPhase): boolean {
  return phase === PHASE_ORDER[PHASE_ORDER.length - 1];
}