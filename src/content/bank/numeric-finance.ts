import type { Q } from "./types";
import { drill, f } from "./util";

const usd = (x: number) => `$${f(x, 4)}`;
const pct = (x: number) => `${f(x * 100, 3)}%`;
const fin = (q: Parameters<typeof drill>[0]) =>
  drill({ m: ["Mixing up units or periods", "Quoting a figure without sanity-checking its size"], ...q });

/** Computed investment banking drills: every worked answer is calculated from its inputs. */
export function investmentBankingDrills(): Q[] {
  const out: Q[] = [];

  for (const [fcf, g, w] of [[100, 0.02, 0.09], [250, 0.025, 0.08], [60, 0.03, 0.11], [480, 0.02, 0.085], [35, 0.015, 0.1], [900, 0.03, 0.095]]) {
    const tv = (fcf * (1 + g)) / (w - g);
    out.push(fin({
      t: `Gordon growth terminal value from FCF of $${f(fcf)}m, g ${pct(g)}, WACC ${pct(w)}`,
      p: `Final-year free cash flow is $${fcf}m, long-term growth is ${pct(g)} and WACC is ${pct(w)}. Compute the terminal value using the perpetuity growth method and its present value five years out, and name the biggest risk in this approach.`,
      d: 2, tp: "ib-valuation",
      i: `Terminal value at the end of year 5 is FCF × (1 + g) / (WACC − g) = ${fcf} × ${f(1 + g)} / (${f(w)} − ${f(g)}) = ${usd(tv)}m. Discounted five years at WACC the present value is ${usd(tv / (1 + w) ** 5)}m. The biggest risk is that the terminal value often makes up most of enterprise value and is very sensitive to the spread between WACC and g, so small changes in either swing the answer; cross-check with an exit multiple.`,
      c: ["TV = FCF × (1 + g) / (WACC − g)", `Terminal value of about ${usd(tv)}m`, `Present value of about ${usd(tv / (1 + w) ** 5)}m`, "Sensitive to the WACC minus g spread; cross-check with a multiple"],
      k: ["Terminal value is usually most of the total value", "The growth rate must stay below long-run economic growth"],
    }));
  }

  for (const [E, D, ke, kd, t] of [[600, 400, 0.11, 0.06, 0.25], [800, 200, 0.1, 0.05, 0.21], [300, 700, 0.14, 0.08, 0.3], [1500, 500, 0.09, 0.045, 0.25], [250, 250, 0.13, 0.07, 0.35], [1000, 100, 0.095, 0.05, 0.21]]) {
    const w = (E / (E + D)) * ke + (D / (E + D)) * kd * (1 - t);
    out.push(fin({
      t: `WACC with equity $${f(E)}m, debt $${f(D)}m, cost of equity ${pct(ke)}, cost of debt ${pct(kd)}, tax ${pct(t)}`,
      p: `A company has $${E}m of equity value and $${D}m of debt. Cost of equity is ${pct(ke)}, pre-tax cost of debt is ${pct(kd)} and the tax rate is ${pct(t)}. Compute WACC and explain why debt is tax-adjusted.`,
      d: 1, tp: "ib-valuation",
      i: `Weights are E/(D+E) = ${pct(E / (E + D))} and D/(D+E) = ${pct(D / (E + D))}. WACC = ${pct(E / (E + D))} × ${pct(ke)} + ${pct(D / (E + D))} × ${pct(kd)} × (1 − ${f(t)}) = ${pct(w)}. Interest is tax deductible, so the after-tax cost of debt, kd × (1 − t), is what the company actually bears.`,
      c: ["WACC weights by market value of equity and debt", `WACC of about ${pct(w)}`, "Cost of debt is adjusted by (1 − tax rate)", "Interest tax shield makes debt cheaper"],
      k: ["Use market values for the weights where possible", "Target capital structure may differ from the current one"],
    }));
  }

  for (const [rf, b, erp] of [[0.04, 1.2, 0.055], [0.03, 0.8, 0.06], [0.045, 1.5, 0.05], [0.035, 0.6, 0.055], [0.05, 1.1, 0.045]]) {
    const ke = rf + b * erp;
    out.push(fin({
      t: `CAPM cost of equity with risk-free ${pct(rf)}, beta ${f(b)}, equity risk premium ${pct(erp)}`,
      p: `The risk-free rate is ${pct(rf)}, the equity risk premium is ${pct(erp)} and a company's levered beta is ${b}. Compute its cost of equity with CAPM and say what beta measures.`,
      d: 1, tp: "ib-valuation",
      i: `CAPM gives cost of equity = rf + β × ERP = ${f(rf)} + ${f(b)} × ${f(erp)} = ${pct(ke)}. Beta measures sensitivity to market-wide (systematic) risk, with 1 meaning the stock moves with the market; diversifiable risk is not rewarded.`,
      c: ["Cost of equity = rf + beta × equity risk premium", `Cost of equity of ${pct(ke)}`, "Beta measures systematic risk", "Diversifiable risk earns no premium"],
      k: ["Higher beta means higher required return", "Levered beta rises with debt"],
    }));
  }

  for (const [aNI, aSh, tNI, price, stockPct] of [[500, 200, 80, 1200, 1], [800, 400, 150, 2400, 0.5], [300, 100, 40, 500, 0], [1000, 250, 120, 1500, 1], [450, 150, 60, 900, 0.6], [2000, 800, 260, 3500, 0.3]]) {
    const aPx = (aNI / aSh) * 15;
    const eps0 = aNI / aSh;
    const newSh = (price * stockPct) / aPx;
    const cashFunded = price * (1 - stockPct);
    const lost = cashFunded * 0.05 * (1 - 0.25);
    const pro = (aNI + tNI - lost) / (aSh + newSh);
    out.push(fin({
      t: `Accretion or dilution: acquirer NI $${f(aNI)}m, target NI $${f(tNI)}m, price $${f(price)}m, ${pct(stockPct)} stock`,
      p: `An acquirer with $${aNI}m net income and ${aSh}m shares (trading at 15x earnings) buys a target earning $${tNI}m for $${price}m. ${pct(stockPct)} is paid in new acquirer stock and the rest in cash that would otherwise earn 5% pre-tax (tax 25%). Ignoring synergies and fees, is the deal accretive or dilutive to EPS, and by how much?`,
      d: 3, tp: "ib-ma", tp2: "ib-valuation",
      i: `Acquirer EPS is ${f(eps0)}. At a share price of ${usd(aPx)}, new shares issued are ${f(newSh)}m. Cash used is $${f(cashFunded)}m, costing ${usd(lost)}m of after-tax interest income. Pro forma net income is ${f(aNI + tNI - lost)} and pro forma shares ${f(aSh + newSh)}m, so pro forma EPS is ${usd(pro)} versus ${usd(eps0)}: ${pro >= eps0 ? "accretive" : "dilutive"} by ${pct(Math.abs(pro / eps0 - 1))}. The rule of thumb is that an all-stock deal is accretive when the target's P/E is lower than the acquirer's.`,
      c: ["Pro forma EPS = combined net income / pro forma shares", `New shares of about ${f(newSh)}m`, `Pro forma EPS of ${usd(pro)} versus ${usd(eps0)}`, `${pro >= eps0 ? "Accretive" : "Dilutive"} by about ${pct(Math.abs(pro / eps0 - 1))}`],
      k: ["Compare the target P/E with the acquirer P/E for stock deals", "Cash deals depend on after-tax cost of cash or debt"],
    }));
  }

  for (const [ev, debtPct, ebitda, growth, exitMult, years] of [[1000, 0.5, 100, 0.06, 10, 5], [800, 0.6, 80, 0.08, 9, 5], [2000, 0.55, 200, 0.04, 11, 5], [500, 0.4, 50, 0.1, 10, 4], [1200, 0.65, 120, 0.05, 8, 5], [3000, 0.5, 280, 0.07, 10.5, 6]]) {
    const debt0 = ev * debtPct;
    const eq0 = ev - debt0;
    const e1 = ebitda * (1 + growth) ** years;
    const exitEv = e1 * exitMult;
    // simplified: debt paid down by 40% of average EBITDA each year
    let debt = debt0;
    let e = ebitda;
    for (let y = 0; y < years; y++) { e *= 1 + growth; debt = Math.max(0, debt - 0.4 * e); }
    const exitEq = exitEv - debt;
    const moic = exitEq / eq0;
    const irr = moic ** (1 / years) - 1;
    out.push(fin({
      t: `LBO returns: $${f(ev)}m entry, ${pct(debtPct)} debt, ${f(exitMult)}x exit, ${years}-year hold`,
      p: `A sponsor buys a business for $${ev}m of enterprise value (EBITDA $${ebitda}m) using ${pct(debtPct)} debt. EBITDA grows ${pct(growth)} a year, free cash flow equal to 40% of each year's EBITDA repays debt, and the company is sold after ${years} years at ${exitMult}x EBITDA. Estimate the equity MOIC and IRR, and say which levers drive the return.`,
      d: 3, tp: "ib-lbo", tp2: "ib-valuation",
      i: `Entry equity is $${f(eq0)}m (debt $${f(debt0)}m). Year-${years} EBITDA is ${usd(e1)}m, so exit enterprise value is ${usd(exitEv)}m. After paying down debt to about ${usd(debt)}m, exit equity is ${usd(exitEq)}m. MOIC is ${f(moic)}x and IRR is ${pct(irr)} (MOIC^(1/${years}) − 1). Returns come from EBITDA growth, multiple expansion or contraction and debt paydown, with leverage amplifying all three but raising risk.`,
      c: ["Equity = enterprise value − net debt at entry and exit", `Exit equity of about ${usd(exitEq)}m`, `MOIC of ${f(moic)}x and IRR of ${pct(irr)}`, "Drivers are EBITDA growth, multiple change and debt paydown"],
      k: ["Leverage amplifies returns and risk", "IRR depends on timing as well as MOIC"],
    }));
  }

  for (const [eq, debt, cash, ebitda] of [[900, 300, 100, 150], [2500, 800, 400, 400], [450, 200, 50, 90], [1800, 0, 300, 220], [700, 500, 120, 110], [5000, 1500, 700, 650]]) {
    const ev = eq + debt - cash;
    out.push(fin({
      t: `Equity value to enterprise value bridge: equity $${f(eq)}m, debt $${f(debt)}m, cash $${f(cash)}m`,
      p: `A company has an equity value of $${eq}m, debt of $${debt}m and cash of $${cash}m, with EBITDA of $${ebitda}m. Compute enterprise value and the EV/EBITDA multiple, and explain why EV rather than equity value is used with EBITDA.`,
      d: 1, tp: "ib-valuation",
      i: `Enterprise value = equity value + debt − cash = ${eq} + ${debt} − ${cash} = $${ev}m. EV/EBITDA = ${ev} / ${ebitda} = ${f(ev / ebitda)}x. EBITDA is earned before interest and so belongs to all capital providers, so it must be compared with a value that includes both debt and equity holders' claims, net of cash.`,
      c: ["EV = equity value + debt − cash (plus preferred and minorities)", `Enterprise value of $${ev}m`, `EV/EBITDA of ${f(ev / ebitda)}x`, "EBITDA is pre-interest, so pair it with EV"],
      k: ["Match the numerator to the claims the denominator belongs to", "Net debt makes comparisons across capital structures fair"],
    }));
  }

  for (const [face, cpn, yld, n] of [[1000, 0.05, 0.06, 5], [1000, 0.04, 0.03, 10], [1000, 0.06, 0.06, 7], [1000, 0.03, 0.05, 3], [1000, 0.07, 0.05, 8]]) {
    let price = 0;
    for (let t = 1; t <= n; t++) price += (face * cpn) / (1 + yld) ** t;
    price += face / (1 + yld) ** n;
    out.push(fin({
      t: `Price of a ${n}-year ${pct(cpn)} coupon bond at a ${pct(yld)} yield`,
      p: `A $${face} face value bond pays an annual ${pct(cpn)} coupon and matures in ${n} years. Market yields are ${pct(yld)}. What is the price, and does it trade at a premium, par or discount?`,
      d: 2, tp: "ib-markets",
      i: `Price is the present value of coupons and principal at the yield: ${usd(price)}. Coupon ${pct(cpn)} versus yield ${pct(yld)} means the bond trades at ${Math.abs(cpn - yld) < 1e-9 ? "par" : cpn > yld ? "a premium" : "a discount"}. Prices move inversely to yields, and longer maturities are more sensitive to yield changes.`,
      c: ["Price is the PV of coupons and principal at the yield", `Price of about ${usd(price)}`, `${Math.abs(cpn - yld) < 1e-9 ? "Par" : cpn > yld ? "Premium" : "Discount"} because coupon versus yield`, "Price and yield move inversely"],
      k: ["Duration grows with maturity and falls with coupon", "Yield is the discount rate that equates price and cash flows"],
    }));
  }

  for (const [metric, mult, debt, cash, sh] of [[120, 9, 300, 50, 40], [75, 12, 100, 40, 25], [300, 7.5, 600, 100, 90], [45, 14, 0, 60, 18], [200, 10, 450, 75, 55]]) {
    const ev = metric * mult;
    const eq = ev - debt + cash;
    out.push(fin({
      t: `Implied share price from ${f(mult)}x EV/EBITDA on $${f(metric)}m EBITDA`,
      p: `Comparable companies trade at ${mult}x EV/EBITDA. The target has EBITDA of $${metric}m, debt of $${debt}m, cash of $${cash}m and ${sh}m diluted shares. What implied share price does the multiple suggest?`,
      d: 2, tp: "ib-valuation",
      i: `Enterprise value is ${mult} × ${metric} = $${f(ev)}m. Equity value is EV − debt + cash = $${f(eq)}m, so the implied price is ${usd(eq / sh)} per share. Use diluted shares (treasury method for options), and check that the comparables are similar in growth, margin and risk.`,
      c: ["Enterprise value = multiple × EBITDA", `Enterprise value of $${f(ev)}m`, `Implied share price of ${usd(eq / sh)}`, "Bridge to equity: subtract debt, add cash, divide by diluted shares"],
      k: ["Comparable choice drives the answer", "Diluted share count matters"],
    }));
  }

  for (const [capex, life, tax] of [[500, 10, 0.25], [1200, 8, 0.21], [90, 5, 0.3], [2000, 20, 0.25], [300, 6, 0.35]]) {
    const dep = capex / life;
    out.push(fin({
      t: `Cash effect of buying $${f(capex)}m of equipment depreciated over ${life} years`,
      p: `A company buys $${capex}m of equipment paid in cash, depreciated straight line over ${life} years at a ${pct(tax)} tax rate. Walk through the first-year effect on net income, cash flow and the balance sheet.`,
      d: 2, tp: "ib-accounting",
      i: `Annual depreciation is $${f(dep)}m. Pre-tax income falls by that amount and net income by ${usd(dep * (1 - tax))}m. In cash flow, net income is lower, depreciation is added back, so operating cash flow rises by the tax saved of ${usd(dep * tax)}m, while investing cash flow shows a $${capex}m outflow. On the balance sheet cash falls by ${usd(capex - dep * tax)}m net, PP&E is $${f(capex - dep)}m, and equity falls by ${usd(dep * (1 - tax))}m, so it balances.`,
      c: [`Depreciation of $${f(dep)}m a year`, `Net income lower by ${usd(dep * (1 - tax))}m`, "Depreciation is non-cash and added back", `Tax shield of ${usd(dep * tax)}m raises cash`],
      k: ["Depreciation reduces taxes but is not a cash cost", "Capex appears in investing cash flow"],
    }));
  }

  for (const [rev, dsoOld, dsoNew] of [[3650, 45, 60], [7300, 30, 40], [1825, 60, 50], [10950, 35, 45], [5475, 50, 40]]) {
    const delta = (rev / 365) * (dsoNew - dsoOld);
    out.push(fin({
      t: `Working capital: DSO moves from ${dsoOld} to ${dsoNew} days on $${f(rev)}m revenue`,
      p: `Annual revenue is $${rev}m. Days sales outstanding moves from ${dsoOld} to ${dsoNew} days. What happens to accounts receivable and to cash flow, and how does it affect a DCF?`,
      d: 2, tp: "ib-accounting", tp2: "ib-valuation",
      i: `Daily revenue is $${f(rev / 365)}m, so receivables change by ${f(dsoNew - dsoOld)} days × $${f(rev / 365)}m = $${f(delta)}m (${delta >= 0 ? "an increase" : "a decrease"}). An increase in an operating asset is a use of cash, so cash flow from operations ${delta >= 0 ? "falls" : "rises"} by $${f(Math.abs(delta))}m. In a DCF, the change in net working capital reduces free cash flow when it increases.`,
      c: ["Receivables = DSO × daily revenue", `Receivables change of $${f(delta)}m`, `Cash flow ${delta >= 0 ? "falls" : "rises"} by $${f(Math.abs(delta))}m`, "Change in working capital flows into free cash flow"],
      k: ["Rising working capital consumes cash", "Collection speed is an operating lever"],
    }));
  }

  return out;
}

/** Computed consulting drills: break-even, payback, growth rates, sizing arithmetic and probability. */
export function consultingDrills(): Q[] {
  const out: Q[] = [];

  for (const [fixed, price, vc] of [[500000, 50, 30], [1200000, 120, 80], [90000, 15, 9], [2500000, 400, 250], [300000, 8, 5], [750000, 60, 42]]) {
    const be = fixed / (price - vc);
    out.push(fin({
      t: `Break-even volume with fixed costs $${f(fixed)}, price $${f(price)}, variable cost $${f(vc)}`,
      p: `A product sells at $${price} with variable cost of $${vc} per unit and fixed costs of $${fixed} a year. What volume breaks even, what happens to break-even if price rises 10%, and what non-numeric points would you raise?`,
      d: 1, tp: "case-math", tp2: "case-strategy",
      i: `Contribution margin is ${price} − ${vc} = $${price - vc} a unit, so break-even is ${fixed} / ${price - vc} = ${f(be)} units. A 10% price rise to $${f(price * 1.1)} lifts contribution to $${f(price * 1.1 - vc)}, cutting break-even to ${f(fixed / (price * 1.1 - vc))} units. Beyond the numbers, I would ask whether demand holds at the higher price, whether capacity covers the volume, and how competitors and fixed costs may change.`,
      c: ["Break-even = fixed costs / contribution margin per unit", `Break-even of about ${f(be)} units`, `Price rise lowers break-even to ${f(fixed / (price * 1.1 - vc))} units`, "Check demand response, capacity and competitor reaction"],
      k: ["Price changes affect volume as well as margin", "Fixed costs may be step-wise"],
    }));
  }

  for (const [inv, ann, ramp] of [[2000000, 500000, 1], [750000, 150000, 0.5], [12000000, 2400000, 1], [90000, 30000, 0.8], [4500000, 900000, 0.6]]) {
    const pay = inv / ann;
    out.push(fin({
      t: `Payback on $${f(inv)} investment earning $${f(ann)} a year`,
      p: `A client can invest $${inv} in a project that earns $${ann} of annual profit at full run rate. Compute the simple payback and discuss what else should inform the decision.`,
      d: 1, tp: "case-math",
      i: `Simple payback is ${inv} / ${ann} = ${f(pay)} years${ramp < 1 ? `; if the first year only reaches ${pct(ramp)} of run rate it is about ${f(1 + (inv - ann * ramp) / ann)} years` : ""}. Payback ignores the time value of money and profits after payback, so I would also check NPV or IRR, risk, strategic fit, funding and what happens if the benefits arrive late.`,
      c: ["Payback = investment / annual profit", `Payback of ${f(pay)} years`, "Ignores time value and later cash flows", "Also consider NPV, risk and strategic fit"],
      k: ["Payback suits quick screening only", "Ramp-up and uncertainty change the real figure"],
    }));
  }

  for (const [dp, dv] of [[0.1, -0.05], [0.05, -0.08], [-0.1, 0.12], [0.2, -0.15], [0.03, 0.02], [-0.05, 0.04]]) {
    const r = (1 + dp) * (1 + dv) - 1;
    out.push(fin({
      t: `Revenue effect of a ${pct(dp)} price change with a ${pct(dv)} volume change`,
      p: `A company changes price by ${pct(dp)} and volume then changes by ${pct(dv)}. What is the percent change in revenue, and why is simply adding the two percentages misleading?`,
      d: 1, tp: "case-math",
      i: `Revenue is price × volume, so it changes by (1 + ${f(dp)}) × (1 + ${f(dv)}) − 1 = ${pct(r)}. Adding the percentages gives ${pct(dp + dv)}, which ignores the cross term and is increasingly wrong for large changes. The check is that revenue ${r >= 0 ? "rises" : "falls"} overall; whether profit follows depends on variable costs per unit.`,
      c: ["Revenue = price × volume", "Multiply the (1 + change) factors", `Revenue change of ${pct(r)}`, "Percent changes do not add; profit depends on unit costs"],
      k: ["Cross term matters for large changes", "Revenue and profit can move in opposite directions"],
    }));
  }

  for (const [rev, cost, cut] of [[1000, 850, 0.05], [500, 420, 0.1], [2400, 2000, 0.03], [800, 760, 0.04], [150, 120, 0.15], [6000, 5100, 0.02]]) {
    const m0 = (rev - cost) / rev;
    const m1 = (rev - cost * (1 - cut)) / rev;
    out.push(fin({
      t: `Margin impact of a ${pct(cut)} cost cut on $${f(rev)}m revenue and $${f(cost)}m costs`,
      p: `A firm has revenue of $${rev}m and total costs of $${cost}m. If costs fall ${pct(cut)} with revenue unchanged, what is the new profit, margin and percent profit increase? Why does a small cost cut move profit so much?`,
      d: 1, tp: "case-math", tp2: "case-strategy",
      i: `Profit starts at $${f(rev - cost)}m (margin ${pct(m0)}). Costs fall to $${f(cost * (1 - cut))}m, so profit is $${f(rev - cost * (1 - cut))}m (margin ${pct(m1)}), a ${pct((rev - cost * (1 - cut)) / (rev - cost) - 1)} rise. Profit is a thin difference between two large numbers, so a small percentage change in costs is a large percentage change in profit.`,
      c: ["Profit = revenue − cost", `New profit of $${f(rev - cost * (1 - cut))}m`, `Margin of ${pct(m1)} from ${pct(m0)}`, "Small cost changes have leveraged effects on profit"],
      k: ["Operating leverage magnifies changes", "Check that the cuts do not hurt revenue"],
    }));
  }

  for (const [pop, share, freq, price, label] of ([[8000000, 0.3, 120, 4, "coffee purchases"], [330000000, 0.6, 2, 25, "restaurant takeaway orders"], [50000000, 0.15, 12, 9, "streaming subscriptions"], [12000000, 0.4, 6, 30, "haircuts"], [20000000, 0.25, 52, 3.5, "bus rides"], [5000000, 0.7, 1, 400, "annual gym memberships"]] as [number, number, number, number, string][])) {
    const total = pop * share * freq * price;
    out.push(fin({
      t: `Market size sketch: ${f(pop)} people, ${pct(share)} buy, ${f(freq)} a year, $${f(price)} each (${label})`,
      p: `Size annual spending on ${label} for a population of ${pop}, where ${pct(share)} are buyers, each buying ${freq} times a year at $${price}. Show the calculation and say how you would sanity-check it.`,
      d: 1, tp: "market-sizing",
      i: `Annual market = population × buyer share × frequency × price = ${pop} × ${f(share)} × ${freq} × $${price} = ${usd(total)}, about $${f(total / 1e6, 3)}m. Sanity checks: compare spend per head ($${f(total / pop, 3)}) with plausible household budgets, check the buyer share against known penetration and test the result with a top-down view from a related market.`,
      c: ["Population × share × frequency × price", `Market of about $${f(total / 1e6, 3)}m`, `Spend per person of about $${f(total / pop, 3)}`, "Sanity-check against per-head spend and a top-down estimate"],
      k: ["State assumptions explicitly", "Round numbers to keep mental maths fast"],
    }));
  }

  for (const [a, b, years] of [[100, 161, 5], [50, 120, 8], [2000, 2600, 3], [10, 100, 10], [400, 300, 4], [75, 200, 6]]) {
    const cagr = (b / a) ** (1 / years) - 1;
    out.push(fin({
      t: `CAGR from ${f(a)} to ${f(b)} over ${years} years`,
      p: `A client's revenue grew from $${a}m to $${b}m over ${years} years. What is the compound annual growth rate and how does it differ from the simple average annual growth?`,
      d: 2, tp: "case-math",
      i: `CAGR = (end / start)^(1/years) − 1 = (${b} / ${a})^(1/${years}) − 1 = ${pct(cagr)}. The simple average is the total change of ${pct(b / a - 1)} divided by ${years}, or ${pct((b / a - 1) / years)}, which overstates growth for rising series because it ignores compounding. A mental shortcut is the rule of 72: doubling in about 72 / (growth in percent) years.`,
      c: ["CAGR = (end / start)^(1 / years) − 1", `CAGR of ${pct(cagr)}`, `Simple average of ${pct((b / a - 1) / years)} is different`, "Rule of 72 for quick estimates"],
      k: ["Compounding makes simple averages misleading", "CAGR hides volatility between endpoints"],
    }));
  }

  for (const [price, vc, disc] of [[100, 60, 0.1], [50, 30, 0.2], [200, 120, 0.05], [80, 50, 0.15], [30, 12, 0.1], [500, 300, 0.2]]) {
    const cm0 = price - vc;
    const cm1 = price * (1 - disc) - vc;
    const req = cm0 / cm1 - 1;
    out.push(fin({
      t: `Volume needed to hold profit after a ${pct(disc)} discount (price $${f(price)}, variable cost $${f(vc)})`,
      p: `A product sells for $${price} with variable cost of $${vc}. If you offer a ${pct(disc)} discount, how much must volume grow to keep total contribution the same, and what would you check before discounting?`,
      d: 2, tp: "case-strategy", tp2: "case-math",
      i: `Contribution falls from $${cm0} to ${usd(cm1)} a unit, so volume must rise by ${cm0} / ${f(cm1)} − 1 = ${pct(req)} to stay level. Before discounting, check price elasticity (can volume realistically grow that much), whether customers who already buy will simply pay less, competitor responses, capacity and the effect on brand and future price expectations.`,
      c: ["Contribution margin per unit before and after", `Required volume increase of ${pct(req)}`, "Compare with realistic price elasticity", "Consider cannibalisation, competitor response and brand"],
      k: ["Discounts hit margin harder than they appear", "Thin margins need much larger volume gains"],
    }));
  }

  for (const [p1, v1, p2, v2, cost] of [[0.6, 10, 0.4, -2, 3], [0.3, 50, 0.7, -5, 10], [0.5, 8, 0.5, -4, 2], [0.2, 100, 0.8, -10, 15], [0.7, 12, 0.3, -6, 4]]) {
    const ev = p1 * v1 + p2 * v2 - cost;
    out.push(fin({
      t: `Expected value: ${pct(p1)} chance of $${f(v1)}m, ${pct(p2)} chance of $${f(v2)}m, cost $${f(cost)}m`,
      p: `A client can launch a venture costing $${cost}m. With ${pct(p1)} probability it earns $${v1}m and with ${pct(p2)} probability it returns $${v2}m. What is the expected value net of cost, and what qualitative factors would you raise?`,
      d: 2, tp: "case-strategy", tp2: "case-math",
      i: `Expected payoff is ${f(p1)} × ${v1} + ${f(p2)} × ${v2} = $${f(p1 * v1 + p2 * v2)}m, and net of the $${cost}m cost the expected value is ${usd(ev)}m, so on numbers alone the venture is ${ev >= 0 ? "attractive" : "unattractive"}. I would also test how reliable the probabilities are, the downside the client can absorb, option value of learning, and strategic fit.`,
      c: ["Expected value = sum of probability × payoff", `Expected payoff of $${f(p1 * v1 + p2 * v2)}m`, `Net expected value of ${usd(ev)}m`, "Probabilities, risk tolerance and strategic fit"],
      k: ["Expected value ignores risk appetite", "Probability estimates should be stress-tested"],
    }));
  }

  for (const [target, faces] of [[7, 6], [9, 6], [10, 6], [4, 6], [11, 6]]) {
    let ways = 0;
    for (let a = 1; a <= faces; a++) for (let b = 1; b <= faces; b++) if (a + b === target) ways++;
    out.push(fin({
      t: `Probability two dice sum to ${target}`,
      p: `You roll two fair six-sided dice. What is the probability the sum is ${target}, and how would you explain your counting method?`,
      d: 1, tp: "brain-teasers",
      i: `There are 6 × 6 = 36 equally likely ordered outcomes. The pairs summing to ${target} number ${ways}, so the probability is ${ways}/36 = ${f(ways / 36)}. Counting ordered pairs matters: (1,6) and (6,1) are different outcomes, which is why a sum of 7 is the most likely.`,
      c: ["36 equally likely ordered outcomes", `${ways} favourable outcomes`, `Probability of ${ways}/36`, "Count ordered pairs, not unordered"],
      k: ["Enumerating beats guessing", "Symmetry explains why middle sums are likeliest"],
    }));
  }

  return out;
}
