export interface DecisionReason {
    code: string;
    description: string;
    evidence?: Record<string, unknown>;
}