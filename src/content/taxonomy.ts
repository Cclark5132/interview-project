// Seed taxonomy. Adding finance/business later = new disciplines with family "finance" | "business".
export const DISCIPLINES = [
  { id: "mechanical", name: "Mechanical engineering", family: "engineering" },
  { id: "aerospace", name: "Aerospace engineering", family: "engineering" },
  { id: "electrical", name: "Electrical & electronics engineering", family: "engineering" },
  { id: "civil", name: "Civil & structural engineering", family: "engineering" },
  { id: "chemical", name: "Chemical engineering", family: "engineering" },
  { id: "materials", name: "Materials engineering", family: "engineering" },
  { id: "industrial", name: "Industrial & manufacturing engineering", family: "engineering" },
  { id: "biomedical", name: "Biomedical engineering", family: "engineering" },
  { id: "environmental", name: "Environmental engineering", family: "engineering" },
  { id: "computer-engineering", name: "Computer engineering", family: "engineering" },
  { id: "computer-science", name: "Computer science & software", family: "computing" },
  { id: "investment-banking", name: "Investment banking & finance", family: "finance" },
  { id: "consulting", name: "Management consulting", family: "business" },
] as const;

import { EXTRA_TOPICS } from "./topics-extra";
import { MORE_COMPANIES, MORE_ROLES } from "./companies-more";
import { FINANCE_COMPANIES, FINANCE_ROLES, FINANCE_TOPICS } from "./topics-finance";

const BASE_TOPICS: { id: string; name: string; disciplineId: string; keywords: string[] }[] = [
  { id: "heat-transfer", name: "Heat transfer", disciplineId: "mechanical", keywords: ["heat transfer", "thermal", "conduction", "convection", "radiator", "heat sink"] },
  { id: "statics-dynamics", name: "Statics & dynamics", disciplineId: "mechanical", keywords: ["statics", "dynamics", "free body", "vibration", "kinematics"] },
  { id: "fatigue-failure", name: "Fatigue & failure analysis", disciplineId: "mechanical", keywords: ["fatigue", "failure analysis", "fracture", "stress concentration"] },
  { id: "design-tolerancing", name: "Design & tolerancing", disciplineId: "mechanical", keywords: ["gd&t", "tolerance", "cad", "design for manufacturing", "dfm"] },
  { id: "fluid-mechanics", name: "Fluid mechanics", disciplineId: "mechanical", keywords: ["fluid", "pump", "cfd", "reynolds", "pressure drop", "hydraulic"] },
  { id: "orbital-mechanics", name: "Orbital mechanics", disciplineId: "aerospace", keywords: ["orbital", "orbit", "delta-v", "trajectory", "satellite"] },
  { id: "propulsion", name: "Propulsion", disciplineId: "aerospace", keywords: ["propulsion", "rocket", "engine", "thrust", "turbine", "combustion"] },
  { id: "aerodynamics", name: "Aerodynamics", disciplineId: "aerospace", keywords: ["aerodynamic", "lift", "drag", "airfoil", "wind tunnel"] },
  { id: "gnc", name: "Guidance, navigation & control", disciplineId: "aerospace", keywords: ["guidance", "navigation", "gnc", "control system", "flight control", "kalman"] },
  { id: "circuit-analysis", name: "Circuit analysis", disciplineId: "electrical", keywords: ["circuit", "op-amp", "impedance", "analog", "kirchhoff"] },
  { id: "power-electronics", name: "Power electronics", disciplineId: "electrical", keywords: ["power electronics", "buck", "boost", "converter", "inverter", "switching"] },
  { id: "signals-systems", name: "Signals & systems", disciplineId: "electrical", keywords: ["signal processing", "filter", "fourier", "sampling", "dsp"] },
  { id: "embedded-systems", name: "Embedded systems", disciplineId: "computer-engineering", keywords: ["embedded", "firmware", "microcontroller", "rtos", "interrupt", "i2c", "spi"] },
  { id: "digital-design", name: "Digital design", disciplineId: "computer-engineering", keywords: ["fpga", "verilog", "vhdl", "digital design", "timing", "rtl"] },
  { id: "structural-analysis", name: "Structural analysis", disciplineId: "civil", keywords: ["structural", "beam", "truss", "load path", "finite element", "fea"] },
  { id: "geotechnical", name: "Geotechnical engineering", disciplineId: "civil", keywords: ["geotechnical", "soil", "foundation", "settlement", "bearing capacity"] },
  { id: "reaction-engineering", name: "Reaction engineering", disciplineId: "chemical", keywords: ["reactor", "reaction kinetics", "cstr", "pfr", "conversion"] },
  { id: "process-safety", name: "Process safety", disciplineId: "chemical", keywords: ["process safety", "hazop", "relief", "safety", "pressure vessel"] },
  { id: "mechanical-properties", name: "Mechanical properties of materials", disciplineId: "materials", keywords: ["stress-strain", "yield", "hardness", "toughness", "composite", "alloy"] },
  { id: "phase-diagrams", name: "Phase diagrams & heat treatment", disciplineId: "materials", keywords: ["phase diagram", "heat treatment", "microstructure", "annealing", "steel"] },
  { id: "quality-spc", name: "Quality & statistical process control", disciplineId: "industrial", keywords: ["spc", "six sigma", "quality", "control chart", "cpk", "dmaic"] },
  { id: "lean-manufacturing", name: "Lean & process improvement", disciplineId: "industrial", keywords: ["lean", "bottleneck", "throughput", "kaizen", "takt", "manufacturing"] },
  { id: "biomaterials-devices", name: "Medical device design", disciplineId: "biomedical", keywords: ["medical device", "biocompatib", "fda", "iso 13485", "implant", "biomaterial"] },
  { id: "water-treatment", name: "Water & wastewater treatment", disciplineId: "environmental", keywords: ["water treatment", "wastewater", "sedimentation", "filtration", "disinfection"] },
  { id: "algorithms", name: "Algorithms & complexity", disciplineId: "computer-science", keywords: ["algorithm", "complexity", "big-o", "data structure", "graph", "sorting"] },
  { id: "systems-design", name: "Systems design", disciplineId: "computer-science", keywords: ["system design", "distributed", "scalab", "microservice", "load balanc", "cache"] },
  { id: "databases", name: "Databases", disciplineId: "computer-science", keywords: ["database", "sql", "index", "transaction", "postgres", "query"] },
  { id: "concurrency-os", name: "Concurrency & operating systems", disciplineId: "computer-science", keywords: ["concurrency", "thread", "mutex", "deadlock", "operating system", "process"] },
  { id: "networking", name: "Networking", disciplineId: "computer-science", keywords: ["networking", "tcp", "http", "dns", "latency", "protocol"] },
];

export const TOPICS = [...BASE_TOPICS, ...EXTRA_TOPICS, ...FINANCE_TOPICS];

export const ROLES: { id: string; name: string; keywords: string[]; disciplines: string[] }[] = [
  ...FINANCE_ROLES,
  ...MORE_ROLES,
  { id: "design-engineer", name: "Design engineer", keywords: ["design engineer", "product design", "mechanical design"], disciplines: ["mechanical", "aerospace", "materials", "biomedical", "industrial"] },
  { id: "thermal-engineer", name: "Thermal engineer", keywords: ["thermal engineer", "thermal analyst", "thermal design"], disciplines: ["mechanical", "aerospace", "electrical", "chemical"] },
  { id: "propulsion-engineer", name: "Propulsion engineer", keywords: ["propulsion engineer", "engine engineer"], disciplines: ["aerospace", "mechanical"] },
  { id: "gnc-engineer", name: "GNC / controls engineer", keywords: ["gnc", "controls engineer", "guidance"], disciplines: ["aerospace", "electrical"] },
  { id: "structures-engineer", name: "Structures engineer", keywords: ["structures engineer", "structural engineer", "stress engineer"], disciplines: ["aerospace", "civil", "mechanical"] },
  { id: "hardware-engineer", name: "Hardware / electronics engineer", keywords: ["hardware engineer", "electrical engineer", "electronics engineer", "pcb"], disciplines: ["electrical", "computer-engineering"] },
  { id: "firmware-engineer", name: "Embedded / firmware engineer", keywords: ["firmware", "embedded"], disciplines: ["computer-engineering", "electrical", "computer-science"] },
  { id: "process-engineer", name: "Process engineer", keywords: ["process engineer", "manufacturing engineer", "production engineer"], disciplines: ["chemical", "industrial", "environmental", "materials"] },
  { id: "quality-engineer", name: "Quality engineer", keywords: ["quality engineer", "reliability engineer"], disciplines: ["industrial", "mechanical", "biomedical", "materials"] },
  { id: "software-engineer", name: "Software engineer", keywords: ["software engineer", "software developer", "backend", "full stack", "sde"], disciplines: ["computer-science", "computer-engineering"] },
];

export const COMPANIES: { id: string; name: string; disciplines: string[] }[] = [
  ...FINANCE_COMPANIES,
  ...MORE_COMPANIES,
  { id: "spacex", name: "SpaceX", disciplines: ["aerospace", "mechanical", "electrical", "computer-engineering", "computer-science", "materials"] },
  { id: "tesla", name: "Tesla", disciplines: ["mechanical", "electrical", "computer-engineering", "computer-science", "industrial", "materials", "chemical"] },
  { id: "boeing", name: "Boeing", disciplines: ["aerospace", "mechanical", "materials", "industrial", "electrical"] },
  { id: "lockheed-martin", name: "Lockheed Martin", disciplines: ["aerospace", "mechanical", "electrical", "computer-engineering", "computer-science"] },
  { id: "northrop-grumman", name: "Northrop Grumman", disciplines: ["aerospace", "mechanical", "electrical", "computer-engineering", "computer-science"] },
  { id: "ge-aerospace", name: "GE Aerospace", disciplines: ["aerospace", "mechanical", "materials", "industrial"] },
  { id: "apple", name: "Apple", disciplines: ["electrical", "computer-engineering", "computer-science", "mechanical", "materials"] },
  { id: "nvidia", name: "NVIDIA", disciplines: ["electrical", "computer-engineering", "computer-science"] },
  { id: "google", name: "Google", disciplines: ["computer-science", "computer-engineering", "electrical"] },
  { id: "amazon", name: "Amazon", disciplines: ["computer-science", "computer-engineering", "industrial"] },
  { id: "microsoft", name: "Microsoft", disciplines: ["computer-science", "computer-engineering"] },
];

export const DIFFICULTIES = [
  { id: 1, name: "Introductory" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Advanced" },
] as const;

export const EVIDENCE_CATEGORIES = [
  { id: "original", name: "Original practice", blurb: "Written for this product; not tied to any company." },
  { id: "role_relevant", name: "Role-relevant practice", blurb: "Relevant to a role or company's work; not a claim the company asked it." },
  { id: "company_reported", name: "Company-reported material", blurb: "Documented in a cited source supplied by the owner." },
] as const;

export const STATUSES = ["draft", "in_review", "approved", "archived"] as const;
export type Status = (typeof STATUSES)[number];
