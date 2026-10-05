import type { SeedQuestion } from "../seed-questions";
import { toSeed } from "./build";
import type { Q } from "./types";
import { aerospaceDrills, mechanicalDrills } from "./numeric-mech-aero";
import { civilDrills, computerEngineeringDrills, electricalDrills } from "./numeric-elec-ce-civil";
import { biomedicalDrills, chemicalDrills, computerScienceDrills, environmentalDrills, industrialDrills, materialsDrills } from "./numeric-other";
import { mechanical } from "./mechanical";
import { aerospace } from "./aerospace";
import { electrical } from "./electrical";
import { civil } from "./civil";
import { chemical } from "./chemical";
import { materials } from "./materials";
import { industrial } from "./industrial";
import { biomedical } from "./biomedical";
import { environmental } from "./environmental";
import { computerEngineering } from "./computer-engineering";
import { computerScience } from "./computer-science";
import { topupEnvironmental, topupBiomedical } from "./parts/topup-env-bio";
import { topupIndustrial, topupComputerEngineering, topupMaterials, topupChemical, topupCivil } from "./parts/topup-rest";

/** Hand-written conceptual questions plus generated quantitative drills, per discipline. */
const SOURCES: [string, Q[]][] = [
  ["mechanical", [...mechanical, ...mechanicalDrills()]],
  ["aerospace", [...aerospace, ...aerospaceDrills()]],
  ["electrical", [...electrical, ...electricalDrills()]],
  ["civil", [...civil, ...topupCivil, ...civilDrills()]],
  ["chemical", [...chemical, ...topupChemical, ...chemicalDrills()]],
  ["materials", [...materials, ...topupMaterials, ...materialsDrills()]],
  ["industrial", [...industrial, ...topupIndustrial, ...industrialDrills()]],
  ["biomedical", [...biomedical, ...topupBiomedical, ...biomedicalDrills()]],
  ["environmental", [...environmental, ...topupEnvironmental, ...environmentalDrills()]],
  ["computer-engineering", [...computerEngineering, ...topupComputerEngineering, ...computerEngineeringDrills()]],
  ["computer-science", [...computerScience, ...computerScienceDrills()]],
];

export const BANK: SeedQuestion[] = SOURCES.flatMap(([d, qs]) => qs.map((q) => toSeed(d, q)));
