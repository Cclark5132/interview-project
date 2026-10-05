// Compact authoring format for the question bank. Expanded into full rubrics by build.ts.
export type Q = {
  /** unique title */
  t: string;
  /** prompt shown to the user */
  p: string;
  /** difficulty 1 introductory, 2 intermediate, 3 advanced */
  d: 1 | 2 | 3;
  /** primary topic id (see src/content/taxonomy.ts) */
  tp: string;
  /** optional second topic id */
  tp2?: string;
  /** optional roles; defaults derive from the topic */
  r?: string[];
  /** ideal answer */
  i: string;
  /** key concepts the answer must contain (4+): first half score technical accuracy, rest completeness */
  c: string[];
  /** reasoning points a strong answer makes (2+) */
  k: string[];
  /** common misconceptions */
  m?: string[];
};

export type Bank = { discipline: string; questions: Q[] };
