// Interview-process briefings shown before technical prep. Compiled from public sources; never insider information.
export type GuideGroup = "engineering" | "computer-science" | "investment-banking" | "consulting";

export type Stage = {
  /** e.g. "Recruiter screen", "Superday", "Partner round" */
  name: string;
  /** e.g. "30 min phone call", "4 back-to-back 30 min interviews on video" */
  format: string;
  /** what is assessed or happens, in your own words */
  what: string;
};

export type Track = {
  group: GuideGroup;
  /** short label such as "Software engineer", "Investment banking analyst", "Hardware engineer" */
  label: string;
  /** typical sequence of stages from application to offer */
  stages: Stage[];
  behavioral: {
    /** does this employer expect structured (STAR-style) stories? */
    star: "expected" | "helpful" | "not-emphasised" | "unclear";
    /** how the behavioral part is run and how much weight it carries */
    style: string;
    /** recurring themes or values the questions probe, e.g. "ownership", "why this firm" */
    themes: string[];
    /** typical questions in your own words (not verbatim quotes from any site) */
    examples: string[];
  };
  technical: {
    /** roughly how much of the process is technical, e.g. "Most of the loop", "About 40 percent" */
    share: string;
    /** areas covered */
    topics: string[];
    /** how it is run: whiteboard, shared editor, case, modeling test, design review ... */
    style: string;
  };
  /** how much they dig into your resume and projects, and how to prepare */
  projects: string;
  /** role-specific notes keyed by role id from the taxonomy (optional) */
  roleNotes?: { roleId: string; notes: string }[];
  /** concrete prep advice */
  prep: string[];
};

export type CompanyGuide = {
  companyId: string;
  /** two or three sentences on how this employer hires */
  summary: string;
  /** YYYY-MM the research was done */
  asOf: string;
  /** how well the material is supported by sources */
  confidence: "high" | "medium" | "low";
  tracks: Track[];
  sources: { label: string; url: string }[];
};

export type GroupGuide = {
  group: GuideGroup;
  summary: string;
  asOf: string;
  stages: Stage[];
  behavioral: Track["behavioral"];
  technical: Track["technical"];
  projects: string;
  prep: string[];
  sources: { label: string; url: string }[];
};
