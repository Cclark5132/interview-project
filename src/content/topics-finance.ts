// Finance and consulting topics. Topic ids are prefixed or distinct so every topic belongs to exactly one discipline.
export const FINANCE_TOPICS: { id: string; name: string; disciplineId: string; keywords: string[] }[] = [
  { id: "ib-accounting", name: "Accounting & three statements", disciplineId: "investment-banking", keywords: ["accounting", "three statements", "balance sheet", "income statement", "cash flow", "depreciation", "deferred tax"] },
  { id: "ib-valuation", name: "Valuation (DCF, comps, precedents)", disciplineId: "investment-banking", keywords: ["valuation", "dcf", "wacc", "comparable", "multiples", "enterprise value", "terminal value"] },
  { id: "ib-ma", name: "M&A and merger models", disciplineId: "investment-banking", keywords: ["merger", "acquisition", "m&a", "accretion", "dilution", "synergies", "purchase price"] },
  { id: "ib-lbo", name: "LBOs & private equity", disciplineId: "investment-banking", keywords: ["lbo", "leveraged buyout", "private equity", "irr", "moic", "leverage", "debt paydown"] },
  { id: "ib-markets", name: "Capital markets & market awareness", disciplineId: "investment-banking", keywords: ["capital markets", "ipo", "debt", "equity", "bonds", "interest rates", "market", "restructuring"] },
  { id: "ib-fit", name: "Banking fit & behavioral", disciplineId: "investment-banking", keywords: ["why banking", "walk me through your resume", "strengths", "weaknesses", "teamwork", "behavioral"] },
  { id: "case-structuring", name: "Case structuring & frameworks", disciplineId: "consulting", keywords: ["case interview", "framework", "mece", "structure", "hypothesis", "issue tree"] },
  { id: "market-sizing", name: "Market sizing & estimation", disciplineId: "consulting", keywords: ["market sizing", "estimate", "guesstimate", "tam", "top-down", "bottom-up"] },
  { id: "case-strategy", name: "Profitability, pricing & growth cases", disciplineId: "consulting", keywords: ["profitability", "pricing", "market entry", "growth strategy", "due diligence", "competitive response"] },
  { id: "case-math", name: "Case math & chart interpretation", disciplineId: "consulting", keywords: ["mental math", "break-even", "payback", "chart", "exhibit", "margin", "roi"] },
  { id: "brain-teasers", name: "Brain teasers & logic", disciplineId: "consulting", keywords: ["brain teaser", "logic puzzle", "probability puzzle", "riddle"] },
  { id: "consulting-fit", name: "Consulting fit & experience", disciplineId: "consulting", keywords: ["why consulting", "fit interview", "leadership story", "pei", "behavioral", "client"] },
];

export const FINANCE_ROLES: { id: string; name: string; keywords: string[]; disciplines: string[] }[] = [
  { id: "ib-analyst", name: "Investment banking analyst", keywords: ["investment banking", "ib analyst", "m&a analyst", "banking analyst"], disciplines: ["investment-banking"] },
  { id: "markets-trader", name: "Sales & trading", keywords: ["sales and trading", "trader", "markets analyst"], disciplines: ["investment-banking"] },
  { id: "equity-research", name: "Equity research", keywords: ["equity research", "research analyst"], disciplines: ["investment-banking"] },
  { id: "private-equity", name: "Private equity associate", keywords: ["private equity", "buyout", "pe associate"], disciplines: ["investment-banking"] },
  { id: "business-analyst", name: "Consulting analyst", keywords: ["business analyst", "consulting analyst", "strategy analyst"], disciplines: ["consulting"] },
  { id: "strategy-associate", name: "Consulting associate / strategy", keywords: ["associate", "strategy consultant", "case team", "corporate strategy"], disciplines: ["consulting"] },
];

export const FINANCE_COMPANIES: { id: string; name: string; disciplines: string[] }[] = [
  { id: "goldman-sachs", name: "Goldman Sachs", disciplines: ["investment-banking"] },
  { id: "jpmorgan", name: "J.P. Morgan", disciplines: ["investment-banking"] },
  { id: "morgan-stanley", name: "Morgan Stanley", disciplines: ["investment-banking"] },
  { id: "evercore", name: "Evercore", disciplines: ["investment-banking"] },
  { id: "lazard", name: "Lazard", disciplines: ["investment-banking"] },
  { id: "blackstone", name: "Blackstone", disciplines: ["investment-banking"] },
  { id: "mckinsey", name: "McKinsey & Company", disciplines: ["consulting"] },
  { id: "bcg", name: "Boston Consulting Group", disciplines: ["consulting"] },
  { id: "bain", name: "Bain & Company", disciplines: ["consulting"] },
  { id: "deloitte", name: "Deloitte", disciplines: ["consulting"] },
  { id: "accenture", name: "Accenture", disciplines: ["consulting"] },
];
