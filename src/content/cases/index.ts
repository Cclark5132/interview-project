import type { SeedQuestion } from "../seed-questions";
import { caseToSeed } from "./build";
import { consultingCases } from "./consulting";
import { engineeringCases } from "./engineering";
import { financeCases } from "./finance";

export const CASES = [...consultingCases, ...financeCases, ...engineeringCases];
export const CASE_SEEDS: SeedQuestion[] = CASES.map(caseToSeed);
