// Staged case interviews. A case reveals itself one stage at a time; data is released only when the candidate asks for it.
export type CaseStage = {
  /** short stage name shown as a step label, e.g. "Structure the problem" */
  title: string;
  /** structure and synthesis stages are written answers; analysis stages interpret data; math stages end in a number */
  kind: "structure" | "analysis" | "math" | "synthesis";
  /** what the interviewer says when this stage opens (second person, concise) */
  prompt: string;
  /** information handed over for free when the stage opens; plain text, tables as aligned monospace text */
  exhibit?: string;
  /** information the candidate may ASK for (revealed one item at a time on request); labels read like requests, e.g. "Competitor pricing" */
  data?: { label: string; content: string }[];
  /** model answer shown after the candidate submits this stage */
  ideal: string;
  /** 4+ key points a strong answer contains */
  c: string[];
  /** 2+ reasoning points a strong answer makes */
  k: string[];
  /** common mistakes */
  m?: string[];
  /** math stages only: the expected numeric result; relative tolerance such as 0.05 */
  answer?: { value: number; unit: string; tolerance: number };
};

export type CaseDef = {
  /** unique title, e.g. "Case: Lakeside Hospital waiting times" */
  t: string;
  /** the interviewer's opening situation; shown before stage 1 */
  opening: string;
  d: 1 | 2 | 3;
  /** discipline id: consulting, investment-banking, or an engineering / computing discipline */
  discipline: string;
  /** primary topic id; must belong to the discipline */
  tp: string;
  tp2?: string;
  /** 4 to 5 stages, in order */
  stages: CaseStage[];
};
