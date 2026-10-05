import type { Q } from "./types";
import { drill, f, log2 } from "./util";

// ---------- Chemical ----------
export function chemicalDrills(): Q[] {
  const out: Q[] = [];
  const R = 8.314;

  for (const [v0, k, X] of [[100, 0.2, 0.8], [50, 0.5, 0.9], [200, 0.1, 0.5], [10, 1, 0.95], [75, 0.3, 0.7], [300, 0.05, 0.4]]) {
    const Vc = (v0 * X) / (k * (1 - X));
    const Vp = (v0 / k) * Math.log(1 / (1 - X));
    out.push(drill({
      t: `CSTR versus PFR volume for ${X * 100}% conversion (k ${k} /min, ${v0} L/min)`,
      p: `A first-order liquid reaction with k = ${k} min⁻¹ is fed at ${v0} L/min. Find the volume needed for ${X * 100} percent conversion in a CSTR and in a PFR, and compare them.`,
      d: 2, tp: "reaction-engineering",
      i: `CSTR: V = v0·X/(k(1−X)) = ${v0}·${X}/(${k}·${f(1 - X)}) = ${f(Vc)} L. PFR: V = (v0/k)·ln(1/(1−X)) = ${f(Vp)} L. The CSTR needs ${f(Vc / Vp)} times the volume because it runs entirely at the low outlet concentration; the ratio grows as conversion rises.`,
      c: ["CSTR design equation V = v0X/(k(1−X)) for first order", `CSTR volume of about ${f(Vc)} L`, `PFR volume of about ${f(Vp)} L from the logarithmic form`, "CSTR needs more volume because it operates at outlet concentration"],
      k: ["Reaction rate falls with concentration, so mixing everything at the outlet value is inefficient", "Several CSTRs in series approach PFR performance"],
    }));
  }

  for (const [Thi, Tho, Tci, Tco, U, Qkw] of [[150, 90, 30, 70, 500, 400], [120, 60, 25, 50, 800, 250], [200, 100, 40, 120, 300, 900], [90, 50, 20, 60, 1000, 150], [180, 110, 50, 100, 600, 500], [100, 70, 20, 45, 700, 120]]) {
    const d1 = Thi - Tco;
    const d2 = Tho - Tci;
    const lmtd = Math.abs(d1 - d2) < 1e-9 ? d1 : (d1 - d2) / Math.log(d1 / d2);
    const A = (Qkw * 1000) / (U * lmtd);
    out.push(drill({
      t: `Counter-current exchanger area for ${Qkw} kW with U = ${U} W/m²K`,
      p: `A counter-current heat exchanger cools a hot stream from ${Thi} °C to ${Tho} °C while heating a cold stream from ${Tci} °C to ${Tco} °C. The duty is ${Qkw} kW and U = ${U} W/m²K. Find the log-mean temperature difference and the required area.`,
      d: 2, tp: "heat-exchangers",
      i: `End differences: ΔT1 = ${Thi} − ${Tco} = ${d1} K and ΔT2 = ${Tho} − ${Tci} = ${d2} K. LMTD = (ΔT1 − ΔT2)/ln(ΔT1/ΔT2) = ${f(lmtd)} K${Math.abs(d1 - d2) < 1e-9 ? " (equal ends, so LMTD equals the difference)" : ""}. Area A = Q/(U·LMTD) = ${Qkw * 1000}/(${U}·${f(lmtd)}) = ${f(A)} m². Add a fouling allowance in practice.`,
      c: ["End temperature differences for counter-current flow", `LMTD of about ${f(lmtd)} K`, `Area A = Q/(U·LMTD) of about ${f(A)} m²`, "Fouling margin added in practice"],
      k: ["Counter-current gives a larger LMTD than co-current for the same duty", "Area grows as the approach temperature shrinks"],
    }));
  }

  for (const [n, Tc, P] of [[2, 25, 101.325], [10, 100, 500], [0.5, 0, 200], [50, 300, 2000], [5, -20, 101.325], [100, 150, 1000]]) {
    const V = (n * R * (Tc + 273.15)) / P;
    out.push(drill({
      t: `Ideal-gas volume of ${n} mol at ${Tc} °C and ${P} kPa`,
      p: `What volume do ${n} mol of an ideal gas occupy at ${Tc} °C and ${P} kPa absolute? When would the ideal-gas assumption be unsafe?`,
      d: 1, tp: "chem-thermodynamics",
      i: `V = nRT/P = ${n}·8.314·${f(Tc + 273.15)}/${P} = ${f(V)} L (kPa·L units). The ideal assumption fails at high pressure or low temperature near condensation, where a compressibility factor Z or an equation of state such as Peng-Robinson is needed.`,
      c: ["Ideal gas law V = nRT/P", "Temperature in kelvin and pressure absolute", `Volume of about ${f(V)} L`, "Real-gas behaviour at high pressure or near condensation needs Z or an equation of state"],
      k: ["The ideal law ignores molecular volume and attraction", "The compressibility factor measures deviation"],
    }));
  }

  for (const [F1, x1, F2, x2] of [[100, 0.2, 50, 0.6], [500, 0.05, 200, 0.3], [80, 0.9, 120, 0.1], [1000, 0.12, 400, 0.45], [25, 0.5, 75, 0.02], [300, 0.35, 300, 0.15]]) {
    const F = F1 + F2;
    const x = (F1 * x1 + F2 * x2) / F;
    out.push(drill({
      t: `Mixing ${F1} kg/h at ${x1} with ${F2} kg/h at ${x2}`,
      p: `Two streams are blended: ${F1} kg/h at mass fraction ${x1} of solute and ${F2} kg/h at mass fraction ${x2}. Find the outlet flow and composition, and state the balances used.`,
      d: 1, tp: "chem-thermodynamics", tp2: "process-control",
      i: `Total balance: F = ${F1} + ${F2} = ${F} kg/h. Component balance: F·x = ${F1}·${x1} + ${F2}·${x2}, so x = ${f(x, 4)}. The blend lies between the two feed compositions, weighted by flow.`,
      c: ["Overall mass balance F = F1 + F2", `Outlet flow of ${F} kg/h`, `Outlet fraction of about ${f(x, 4)} from a component balance`, "Result lies between the feed compositions"],
      k: ["Steady-state balances have no accumulation", "Mass fractions weight by flow, not simply averaging"],
    }));
  }

  for (const [x1, P1, P2] of [[0.5, 120, 45], [0.3, 100, 38], [0.7, 180, 70], [0.4, 85, 30], [0.6, 150, 55], [0.2, 200, 90]]) {
    const P = x1 * P1 + (1 - x1) * P2;
    const y1 = (x1 * P1) / P;
    out.push(drill({
      t: `Raoult's law bubble point at x₁ = ${x1} (Psat ${P1} and ${P2} kPa)`,
      p: `A binary ideal liquid mixture has x₁ = ${x1}. At the temperature of interest the pure vapour pressures are ${P1} kPa (component 1) and ${P2} kPa (component 2). Find the bubble-point pressure and the first vapour composition.`,
      d: 2, tp: "chem-thermodynamics", tp2: "mass-transfer",
      i: `P = x1·P1sat + x2·P2sat = ${x1}·${P1} + ${f(1 - x1)}·${P2} = ${f(P)} kPa. Vapour fraction y1 = x1·P1sat/P = ${f(y1, 3)}. The vapour is richer in the more volatile component 1, which is the basis of distillation.`,
      c: ["Raoult's law for an ideal liquid mixture", `Bubble pressure of about ${f(P)} kPa`, `y1 of about ${f(y1, 3)}`, "Vapour is enriched in the more volatile component"],
      k: ["Ideal behaviour assumes similar molecular interactions", "Non-ideal mixtures need activity coefficients"],
    }));
  }

  for (const [m, cp, dT] of [[2, 4.18, 40], [0.5, 2.0, 100], [10, 4.18, 15], [1.2, 1.0, 200], [5, 3.5, 30], [0.25, 4.18, 60]]) {
    const Q = m * cp * dT;
    out.push(drill({
      t: `Heat duty to warm ${m} kg/s of fluid (cp ${cp}) by ${dT} K`,
      p: `A stream of ${m} kg/s with specific heat ${cp} kJ/kg·K must be heated by ${dT} K. What heat duty is required, and what steam flow supplies it if latent heat is 2100 kJ/kg?`,
      d: 1, tp: "heat-exchangers", tp2: "chem-thermodynamics",
      i: `Q = ṁ·cp·ΔT = ${m}·${cp}·${dT} = ${f(Q)} kW. Steam flow = Q/λ = ${f(Q)}/2100 = ${f(Q / 2100)} kg/s, assuming condensation without subcooling. Add margin for losses.`,
      c: ["Sensible heat Q = ṁ cp ΔT", `Duty of about ${f(Q)} kW`, `Steam flow of about ${f(Q / 2100)} kg/s from latent heat`, "Assumes condensate leaves at saturation"],
      k: ["Condensing steam delivers mostly latent heat at constant temperature", "Duty fixes the area through U and LMTD"],
    }));
  }

  for (const [fr, L, D, v, rho] of [[0.02, 100, 50, 2, 1000], [0.03, 50, 25, 1.5, 850], [0.018, 500, 100, 3, 1000], [0.025, 20, 20, 5, 1.2], [0.022, 200, 75, 1.8, 900], [0.016, 1000, 200, 2.5, 1000]]) {
    const dP = fr * (L / (D / 1000)) * ((rho * v * v) / 2);
    out.push(drill({
      t: `Darcy-Weisbach pressure drop over ${L} m of ${D} mm pipe at ${v} m/s`,
      p: `Fluid of density ${rho} kg/m³ flows at ${v} m/s through ${L} m of ${D} mm pipe with Darcy friction factor ${fr}. Find the frictional pressure drop and the effect of doubling the flow.`,
      d: 2, tp: "fluid-transport",
      i: `ΔP = f·(L/D)·(ρv²/2) = ${fr}·(${L}/${D / 1000})·(${rho}·${v}²/2) = ${f(dP / 1000)} kPa. Doubling the velocity raises ΔP by about four times in fully turbulent flow, because it scales with v² (the friction factor changes only slightly).`,
      c: ["Darcy-Weisbach ΔP = f(L/D)(ρv²/2)", `Pressure drop of about ${f(dP / 1000)} kPa`, "Diameter converted to metres", "Doubling flow gives roughly four times the drop"],
      k: ["Friction loss scales with velocity squared", "Larger diameter cuts pressure drop sharply, at higher pipe cost"],
    }));
  }

  for (const [fed, used, B] of [[100, 80, 60], [50, 45, 30], [200, 120, 100], [10, 9, 7], [80, 40, 38], [500, 350, 280]]) {
    const X = used / fed;
    out.push(drill({
      t: `Conversion, yield and selectivity: ${fed} mol fed, ${used} consumed, ${B} desired`,
      p: `${fed} mol of reactant A are fed. ${used} mol are consumed and ${B} mol of the desired product B form (1:1 stoichiometry). Compute conversion, yield and selectivity and say what the remainder implies.`,
      d: 2, tp: "reaction-engineering",
      i: `Conversion X = ${used}/${fed} = ${f(X * 100)} percent. Yield = ${B}/${fed} = ${f((B / fed) * 100)} percent. Selectivity = desired/consumed = ${B}/${used} = ${f((B / used) * 100)} percent. The ${used - B} mol consumed but not converted to B went to byproducts, so improving selectivity matters as much as conversion.`,
      c: ["Conversion is fraction of feed consumed", `X of ${f(X * 100)} percent`, `Yield of ${f((B / fed) * 100)} percent and selectivity of ${f((B / used) * 100)} percent`, "Unaccounted converted moles are byproducts"],
      k: ["Yield equals conversion times selectivity for 1:1 stoichiometry", "High conversion with low selectivity wastes feed"],
    }));
  }

  for (const [al, x] of [[2.5, 0.4], [1.5, 0.5], [3, 0.2], [2, 0.8], [4, 0.1], [1.2, 0.6]]) {
    const y = (al * x) / (1 + (al - 1) * x);
    out.push(drill({
      t: `Vapour-liquid equilibrium at α = ${al} and x = ${x}`,
      p: `A binary mixture has constant relative volatility α = ${al}. Find the equilibrium vapour mole fraction y for x = ${x}, and say how α affects the number of distillation stages needed.`,
      d: 2, tp: "mass-transfer",
      i: `y = αx/(1+(α−1)x) = ${al}·${x}/(1+${f(al - 1)}·${x}) = ${f(y, 3)}. The vapour is richer in the light component. A larger α means easier separation and fewer stages, while α near 1 needs very many stages or a different method.`,
      c: ["Equilibrium relation y = αx/(1+(α−1)x)", `y of about ${f(y, 3)}`, "Vapour enriched in the light component", "Larger α means fewer stages"],
      k: ["Relative volatility measures separability", "Azeotropes break the constant-α assumption"],
    }));
  }
  return out;
}

// ---------- Materials ----------
export function materialsDrills(): Q[] {
  const out: Q[] = [];

  for (const [s0, k, dum] of [[70, 0.74, 50], [100, 0.5, 10], [25, 0.3, 100], [150, 0.6, 5], [70, 0.74, 5], [200, 0.9, 20]]) {
    const sy = s0 + k / Math.sqrt(dum / 1000);
    out.push(drill({
      t: `Hall-Petch yield strength at ${dum} µm grain size (σ0 ${s0} MPa, k ${k})`,
      p: `A metal has σ0 = ${s0} MPa and Hall-Petch constant k = ${k} MPa·mm^½. Estimate its yield strength at an average grain diameter of ${dum} µm and explain why smaller grains strengthen it.`,
      d: 2, tp: "mechanical-properties", tp2: "diffusion-kinetics",
      i: `σy = σ0 + k/√d with d = ${dum / 1000} mm gives ${s0} + ${k}/${f(Math.sqrt(dum / 1000), 3)} = ${f(sy)} MPa. Grain boundaries block dislocation motion, so more boundaries per volume raise the stress needed for slip. The effect weakens at nanometre grain sizes.`,
      c: ["Hall-Petch σy = σ0 + k/√d", `Yield strength of about ${f(sy)} MPa`, "Grain size converted to millimetres", "Grain boundaries impede dislocation motion"],
      k: ["Finer grains are both stronger and tougher in many metals", "Very small grains can soften through boundary sliding"],
    }));
  }

  for (const [C0, Ca, Cb] of [[40, 20, 60], [30, 10, 70], [50, 25, 90], [60, 30, 80], [45, 5, 95], [25, 10, 50]]) {
    const Wa = (Cb - C0) / (Cb - Ca);
    out.push(drill({
      t: `Lever rule for an alloy of ${C0} wt% with tie-line ends ${Ca} and ${Cb}`,
      p: `An alloy of overall composition ${C0} wt% B lies in a two-phase region whose tie line meets the α phase at ${Ca} wt% and the β phase at ${Cb} wt%. Find the mass fraction of each phase.`,
      d: 2, tp: "phase-diagrams",
      i: `Lever rule: Wα = (Cβ − C0)/(Cβ − Cα) = (${Cb} − ${C0})/(${Cb} − ${Ca}) = ${f(Wa, 3)}. Wβ = 1 − Wα = ${f(1 - Wa, 3)}. Each fraction is the lever arm on the opposite side of the alloy composition, so the phase nearer the alloy composition dominates.`,
      c: ["Lever rule along the tie line", `α fraction of about ${f(Wa, 3)}`, `β fraction of about ${f(1 - Wa, 3)}`, "Fractions are lever arms measured to the opposite phase"],
      k: ["The tie line fixes the phase compositions at that temperature", "Fractions change as temperature moves the tie-line ends"],
    }));
  }

  for (const [Q, T1, T2] of [[140, 600, 800], [200, 700, 900], [80, 300, 500], [250, 900, 1100], [110, 500, 700], [160, 800, 1000]]) {
    const ratio = Math.exp(((Q * 1000) / 8.314) * (1 / (T1 + 273.15) - 1 / (T2 + 273.15)));
    out.push(drill({
      t: `Diffusion speed-up from ${T1} °C to ${T2} °C with Q = ${Q} kJ/mol`,
      p: `Diffusion follows D = D0·exp(−Q/RT) with activation energy ${Q} kJ/mol. By what factor does D increase when the temperature rises from ${T1} °C to ${T2} °C?`,
      d: 2, tp: "diffusion-kinetics",
      i: `Ratio D2/D1 = exp[(Q/R)(1/T1 − 1/T2)] with T in kelvin = exp[(${Q}e3/8.314)(1/${f(T1 + 273.15)} − 1/${f(T2 + 273.15)})] = ${f(ratio)}. Diffusion is thermally activated, so modest heating gives large rate increases, which is why heat treatment times shrink sharply with temperature.`,
      c: ["Arrhenius form D = D0 exp(−Q/RT)", "Temperatures in kelvin", `Ratio of about ${f(ratio)}`, "Thermally activated process rises steeply with temperature"],
      k: ["Higher activation energy means stronger temperature sensitivity", "Diffusion drives carburising, homogenising and creep"],
    }));
  }

  for (const [K, s, Y] of [[50, 300, 1.0], [30, 500, 1.1], [100, 400, 1.0], [5, 100, 1.2], [60, 800, 1.12], [25, 250, 1.0]]) {
    const ac = (1 / Math.PI) * (K / (Y * s)) ** 2 * 1000;
    out.push(drill({
      t: `Critical flaw size for KIc ${K} MPa√m at ${s} MPa`,
      p: `A component with plane-strain fracture toughness ${K} MPa√m and geometry factor Y = ${Y} sees a tensile stress of ${s} MPa. What is the critical crack length, and why does it matter for inspection?`,
      d: 3, tp: "mechanical-properties", tp2: "fatigue-failure",
      i: `Fracture occurs when K = Yσ√(πa) reaches KIc, so ac = (1/π)(KIc/(Yσ))² = (1/π)(${K}/(${Y}·${s}))² = ${f(ac)} mm. Inspection must reliably find flaws well below ac, and fatigue crack growth sets how often inspections are needed.`,
      c: ["Fracture criterion K = Yσ√(πa) = KIc", `Critical crack length of about ${f(ac)} mm`, "Units kept consistent (MPa√m and metres)", "Inspection must detect flaws well below the critical size"],
      k: ["Higher stress sharply lowers the tolerable flaw size", "Damage-tolerant design combines toughness, inspection interval and crack growth rate"],
    }));
  }

  for (const [se, ee] of [[400, 0.1], [250, 0.05], [600, 0.2], [800, 0.02], [300, 0.15], [500, 0.3]]) {
    const st = se * (1 + ee);
    const et = Math.log(1 + ee);
    out.push(drill({
      t: `True stress and strain at engineering ${se} MPa and ${ee * 100}% strain`,
      p: `A tensile test shows engineering stress ${se} MPa at engineering strain ${ee}. Convert to true stress and true strain, assuming uniform deformation, and explain why they differ.`,
      d: 2, tp: "mechanical-properties",
      i: `True stress σT = σe(1 + εe) = ${se}·${1 + ee} = ${f(st)} MPa. True strain εT = ln(1 + εe) = ${f(et, 3)}. They differ because engineering values use the original area and length, while true values use instantaneous ones. The conversion holds only before necking.`,
      c: ["σT = σe(1 + εe)", `True stress of about ${f(st)} MPa`, `True strain of about ${f(et, 3)}`, "Valid only before necking"],
      k: ["The area shrinks as the specimen elongates, raising true stress", "Engineering stress falls after necking while true stress keeps rising"],
    }));
  }

  for (const [E, a, dT] of [[200, 12, 50], [70, 23, 80], [210, 11.7, 100], [110, 17, 40], [350, 8, 200], [117, 16, 60]]) {
    const s = E * 1000 * a * 1e-6 * dT;
    out.push(drill({
      t: `Thermal stress in a fully constrained part (E ${E} GPa, α ${a}e-6, ΔT ${dT} K)`,
      p: `A part with E = ${E} GPa and α = ${a}×10⁻⁶ /K is heated by ${dT} K while held rigidly between fixed walls. Find the thermal stress and its sign.`,
      d: 2, tp: "mechanical-properties", tp2: "design-tolerancing",
      i: `Constrained thermal stress σ = EαΔT = ${E}e3·${a}e-6·${dT} = ${f(s)} MPa, compressive on heating. If this approaches yield or buckling load, add expansion allowance or compliance.`,
      c: ["Constrained thermal stress σ = EαΔT", `Stress of about ${f(s)} MPa`, "Compressive when heated, tensile when cooled", "Design remedy: expansion allowance or compliance"],
      k: ["Free expansion produces no stress; restraint produces it", "Mismatched coefficients between bonded materials cause thermal stress"],
    }));
  }

  for (const [Ef, Em, Vf] of [[230, 3.5, 0.6], [72, 3, 0.5], [400, 70, 0.3], [230, 3.5, 0.4], [70, 2.8, 0.55], [200, 4, 0.7]]) {
    const up = Vf * Ef + (1 - Vf) * Em;
    const lo = 1 / (Vf / Ef + (1 - Vf) / Em);
    out.push(drill({
      t: `Composite modulus bounds for ${Vf * 100}% fibre (Ef ${Ef} GPa, Em ${Em} GPa)`,
      p: `A composite has fibre modulus ${Ef} GPa, matrix modulus ${Em} GPa and fibre volume fraction ${Vf}. Compute the longitudinal (iso-strain) and transverse (iso-stress) modulus estimates and say which direction is stiffer.`,
      d: 2, tp: "composites",
      i: `Along the fibres (iso-strain, rule of mixtures): Ec = VfEf + (1−Vf)Em = ${f(up)} GPa. Across the fibres (iso-stress): 1/Ec = Vf/Ef + (1−Vf)/Em, so Ec = ${f(lo)} GPa. The longitudinal value is much higher, so composites are strongly anisotropic and laminate layups orient plies to the loads.`,
      c: ["Iso-strain rule of mixtures along fibres", `Longitudinal modulus of about ${f(up)} GPa`, `Transverse modulus of about ${f(lo)} GPa`, "Strong anisotropy drives ply orientation"],
      k: ["The longitudinal estimate is the upper bound and the transverse estimate is the lower bound", "Matrix properties dominate transverse and shear behaviour"],
    }));
  }

  for (const hb of [150, 200, 250, 300, 350, 400]) {
    const uts = 3.45 * hb;
    out.push(drill({
      t: `Estimate tensile strength from ${hb} HB hardness`,
      p: `A steel measures ${hb} Brinell hardness. Use the common approximation to estimate ultimate tensile strength and state when the relation is unreliable.`,
      d: 1, tp: "characterization", tp2: "mechanical-properties",
      i: `For many steels UTS ≈ 3.45 × HB MPa = 3.45·${hb} = ${f(uts)} MPa. It is an empirical rule for carbon and low-alloy steels; it is unreliable for other alloy families, heavily cold-worked material, or case-hardened parts, where hardness varies with depth.`,
      c: ["Empirical relation UTS ≈ 3.45·HB MPa for steels", `Estimate of about ${f(uts)} MPa`, "Applies to carbon and low-alloy steels", "Unreliable for other alloys and case-hardened surfaces"],
      k: ["Hardness is a quick, nearly non-destructive proxy for strength", "Direct tensile testing is needed for design values"],
    }));
  }

  for (const [sg, E] of [[200, 200], [400, 70], [100, 110], [500, 210], [50, 3], [300, 117]]) {
    const eps = sg / (E * 1000);
    const u = (sg * sg) / (2 * E * 1000);
    out.push(drill({
      t: `Elastic strain and stored energy at ${sg} MPa (E ${E} GPa)`,
      p: `A material with E = ${E} GPa is loaded elastically to ${sg} MPa. Find the elastic strain and the strain energy per unit volume.`,
      d: 1, tp: "mechanical-properties",
      i: `Strain ε = σ/E = ${sg}/${E * 1000} = ${f(eps, 3)} (${f(eps * 100, 3)} percent). Energy density u = σ²/(2E) = ${sg}²/(2·${E * 1000}) = ${f(u)} MJ/m³. This area under the elastic line is the resilience, recoverable on unloading.`,
      c: ["Hooke's law ε = σ/E", `Strain of about ${f(eps, 3)}`, `Energy density σ²/(2E) of about ${f(u)} MJ/m³`, "Elastic energy is fully recoverable"],
      k: ["Springs and flexures want high strength with low modulus for high resilience", "Toughness is the area to fracture, not just the elastic part"],
    }));
  }

  for (const [name, n, A, a] of [["copper (FCC)", 4, 63.55, 0.3615], ["iron (BCC)", 2, 55.85, 0.2866], ["aluminium (FCC)", 4, 26.98, 0.405], ["nickel (FCC)", 4, 58.69, 0.3524], ["tungsten (BCC)", 2, 183.84, 0.3165], ["gold (FCC)", 4, 196.97, 0.4078]] as [string, number, number, number][]) {
    const rho = (n * A) / (a * 1e-7) ** 3 / 6.022e23;
    out.push(drill({
      t: `Theoretical density of ${name}`,
      p: `Compute the theoretical density of ${name} with lattice parameter ${a} nm and atomic weight ${A} g/mol, using ${n} atoms per unit cell.`,
      d: 2, tp: "mechanical-properties", tp2: "characterization",
      i: `ρ = nA/(VcNA) with Vc = a³ = (${a}e-7 cm)³. ρ = ${n}·${A}/((${a}e-7)³·6.022e23) = ${f(rho)} g/cm³. Measured density is slightly lower because of vacancies, porosity and impurities.`,
      c: ["Density = (atoms per cell × atomic weight)/(cell volume × Avogadro)", `${n} atoms per cell for this structure`, `Density of about ${f(rho)} g/cm³`, "Real density is a bit lower due to defects"],
      k: ["FCC has 4 atoms per cell and BCC has 2", "Unit conversions from nm to cm are a common error"],
    }));
  }
  return out;
}

// ---------- Industrial ----------
export function industrialDrills(): Q[] {
  const out: Q[] = [];

  for (const [a, p, q] of [[90, 95, 99], [85, 80, 98], [92, 88, 95], [70, 90, 97], [95, 97, 99.5], [80, 75, 90]]) {
    const oee = (a * p * q) / 10000;
    out.push(drill({
      t: `OEE with ${a}% availability, ${p}% performance and ${q}% quality`,
      p: `A machine runs at ${a} percent availability, ${p} percent performance and ${q} percent quality. Compute OEE, name the biggest loss category, and suggest the first improvement action.`,
      d: 1, tp: "lean-manufacturing", tp2: "quality-spc",
      i: `OEE = A × P × Q = ${a / 100}·${p / 100}·${q / 100} = ${f(oee)} percent. The lowest factor, ${Math.min(a, p, q)} percent, is the biggest loss. Typical actions: availability via faster changeovers and downtime reduction, performance via speed loss and minor-stop elimination, quality via root-cause defect reduction. World-class OEE is often cited near 85 percent.`,
      c: ["OEE = availability × performance × quality", `OEE of about ${f(oee)} percent`, `Biggest loss identified as the ${Math.min(a, p, q)} percent factor`, "Matching improvement action such as SMED or defect root cause"],
      k: ["OEE multiplies losses, so each factor compounds", "Improve the largest loss first, measured by time"],
    }));
  }

  for (const [th, ct] of [[20, 3], [50, 0.5], [8, 12], [120, 0.25], [15, 6], [200, 0.1]]) {
    out.push(drill({
      t: `Little's Law with throughput ${th}/h and ${ct} h cycle time`,
      p: `A process has throughput ${th} units per hour and an average cycle time of ${ct} hours. Use Little's Law to find average work in process, and explain what happens to cycle time if WIP is cut in half at constant throughput.`,
      d: 1, tp: "lean-manufacturing", tp2: "operations-research",
      i: `WIP = throughput × cycle time = ${th}·${ct} = ${f(th * ct)} units. At constant throughput, halving WIP halves cycle time to ${f(ct / 2)} h. This is why limiting WIP, for instance with kanban, shortens lead times.`,
      c: ["Little's Law WIP = TH × CT", `WIP of ${f(th * ct)} units`, `Halved WIP gives cycle time of ${f(ct / 2)} h`, "WIP limits shorten lead time"],
      k: ["Holds for any stable system in steady state", "Lower WIP also exposes problems that buffers hide"],
    }));
  }

  for (const [avail, brk, dem] of [[480, 30, 450], [480, 40, 220], [420, 20, 800], [960, 60, 1000], [480, 30, 120], [450, 30, 300]]) {
    const takt = ((avail - brk) * 60) / dem;
    out.push(drill({
      t: `Takt time for ${dem} units in a ${avail}-minute shift`,
      p: `A shift has ${avail} minutes with ${brk} minutes of breaks, and customer demand is ${dem} units per shift. Compute takt time and explain how it differs from cycle time.`,
      d: 1, tp: "lean-manufacturing",
      i: `Takt = available production time / demand = (${avail} − ${brk})·60/${dem} = ${f(takt)} seconds per unit. Takt is the pace the customer requires; cycle time is what each process actually delivers. Every step needs cycle time at or below takt, or a bottleneck forms.`,
      c: ["Takt = available time / customer demand", `Takt of about ${f(takt)} seconds`, "Takt is demand-driven; cycle time is process-driven", "Cycle time must not exceed takt"],
      k: ["Takt changes when demand or shift pattern changes", "Level production avoids peaks that strain capacity"],
    }));
  }

  for (const [D, S, H] of [[10000, 50, 2], [5000, 100, 5], [24000, 30, 1.5], [1200, 25, 4], [50000, 200, 10], [8000, 60, 3]]) {
    const q = Math.sqrt((2 * D * S) / H);
    out.push(drill({
      t: `Economic order quantity: D ${D}, S $${S}, H $${H}`,
      p: `Annual demand is ${D} units, ordering cost is $${S} per order and holding cost is $${H} per unit per year. Find the EOQ, the number of orders per year, and the total annual ordering plus holding cost.`,
      d: 2, tp: "supply-chain", tp2: "operations-research",
      i: `EOQ = √(2DS/H) = √(2·${D}·${S}/${H}) = ${f(q)} units. Orders per year = D/Q = ${f(D / q)}. Total cost = (D/Q)S + (Q/2)H = ${f((D / q) * S + (q / 2) * H)} dollars; at the EOQ ordering and holding costs are equal. The model assumes constant demand and no stockouts.`,
      c: ["EOQ = √(2DS/H)", `EOQ of about ${f(q)} units`, `About ${f(D / q)} orders per year`, `Total cost of about $${f((D / q) * S + (q / 2) * H)} with equal ordering and holding parts`],
      k: ["Total cost is flat near the optimum, so rounding is safe", "Assumptions break with variable demand or quantity discounts"],
    }));
  }

  for (const [U, Lw, mu, s] of [[10.5, 9.5, 10.0, 0.1], [50, 40, 46, 1.2], [25, 15, 20.5, 1.5], [100, 90, 95, 2], [5.02, 4.98, 5.005, 0.004], [12, 8, 10.8, 0.5]]) {
    const cp = (U - Lw) / (6 * s);
    const cpk = Math.min(U - mu, mu - Lw) / (3 * s);
    out.push(drill({
      t: `Process capability for limits ${Lw} to ${U}, mean ${mu}, σ ${s}`,
      p: `A characteristic has specification limits ${Lw} to ${U}. The process is stable with mean ${mu} and standard deviation ${s}. Compute Cp and Cpk and interpret the gap between them.`,
      d: 2, tp: "quality-spc",
      i: `Cp = (USL − LSL)/(6σ) = ${f(cp)}. Cpk = min(USL − μ, μ − LSL)/(3σ) = ${f(cpk)}. ${cp - cpk > 0.05 ? "Cpk is below Cp because the mean is off-centre, so re-centering recovers capability." : "Cp and Cpk are close, so the process is nearly centred."} A common target is Cpk of at least 1.33.`,
      c: ["Cp = (USL − LSL)/6σ", `Cp of about ${f(cp)}`, `Cpk of about ${f(cpk)}`, "Gap between Cp and Cpk shows off-centring"],
      k: ["Cp ignores centring while Cpk includes it", "Capability indices assume a stable, roughly normal process"],
    }));
  }

  const A2: Record<number, number> = { 2: 1.88, 3: 1.023, 4: 0.729, 5: 0.577, 6: 0.483 };
  for (const [xb, Rb, n] of [[50, 4, 5], [12.5, 0.6, 4], [100, 10, 3], [7.2, 0.35, 6], [250, 18, 5], [33, 2.2, 2]]) {
    const a2 = A2[n];
    out.push(drill({
      t: `X-bar chart limits for grand mean ${xb}, mean range ${Rb}, n = ${n}`,
      p: `Subgroups of size ${n} give a grand mean of ${xb} and an average range of ${Rb}. Using A2 = ${a2}, compute the X-bar chart control limits and explain what a point outside them means.`,
      d: 2, tp: "quality-spc",
      i: `UCL = x̿ + A2·R̄ = ${xb} + ${a2}·${Rb} = ${f(xb + a2 * Rb)}. LCL = x̿ − A2·R̄ = ${f(xb - a2 * Rb)}. A point outside the limits signals a special cause, so investigate before adjusting. Control limits describe process behaviour and are not specification limits.`,
      c: ["X-bar limits x̿ ± A2·R̄", `UCL of about ${f(xb + a2 * Rb)}`, `LCL of about ${f(xb - a2 * Rb)}`, "Out-of-limit points indicate special-cause variation"],
      k: ["Control limits come from the process, specifications come from the customer", "Adjusting for common-cause noise increases variation"],
    }));
  }

  for (const [T1, rate, n] of [[100, 80, 8], [50, 90, 16], [200, 85, 10], [30, 75, 4], [120, 95, 20], [80, 70, 32]]) {
    const b = Math.log2(rate / 100);
    const Tn = T1 * n ** b;
    out.push(drill({
      t: `Learning curve: ${rate}% rate, first unit ${T1} h, unit ${n}`,
      p: `The first unit takes ${T1} hours and the process follows an ${rate} percent learning curve (time per unit falls to ${rate} percent each time cumulative output doubles). Estimate the time for unit number ${n}.`,
      d: 2, tp: "forecasting-simulation", tp2: "lean-manufacturing",
      i: `Tn = T1·n^b with b = log2(${rate / 100}) = ${f(b, 3)}. Tn = ${T1}·${n}^${f(b, 3)} = ${f(Tn)} hours. Each doubling of output multiplies unit time by ${rate / 100}. The curve flattens once process improvement is exhausted.`,
      c: ["Learning curve Tn = T1·n^b with b = log2(rate)", `Exponent of about ${f(b, 3)}`, `Unit ${n} time of about ${f(Tn)} h`, "Each doubling scales time by the learning rate"],
      k: ["Learning applies to repetitive work and fades over time", "Used for cost estimating and capacity planning"],
    }));
  }

  for (const [T, C, N] of [[240, 60, 5], [180, 45, 5], [300, 90, 4], [600, 100, 7], [150, 50, 4], [420, 70, 8]]) {
    const min = Math.ceil(T / C);
    const eff = T / (N * C);
    out.push(drill({
      t: `Line balancing: ${T} s of work with a ${C} s cycle time`,
      p: `An assembly line has ${T} seconds of total task time and a required cycle time of ${C} seconds. Find the theoretical minimum number of stations and the efficiency if ${N} stations are used.`,
      d: 2, tp: "lean-manufacturing", tp2: "operations-research",
      i: `Minimum stations = ceil(total time/cycle time) = ceil(${T}/${C}) = ${min}. Efficiency with ${N} stations = T/(N·C) = ${T}/(${N}·${C}) = ${f(eff * 100)} percent, so balance delay is ${f((1 - eff) * 100)} percent. Precedence constraints often prevent reaching the theoretical minimum.`,
      c: ["Minimum stations = ceil(total task time / cycle time)", `${min} stations minimum`, `Efficiency of about ${f(eff * 100)} percent with ${N} stations`, "Precedence constraints limit balancing"],
      k: ["Idle time at stations is waste", "Smaller task elements make balancing easier"],
    }));
  }

  for (const [z, sd, L] of [[1.65, 20, 9], [2.33, 50, 4], [1.28, 10, 16], [1.88, 100, 6], [2.05, 15, 25], [1.65, 8, 2.25]]) {
    const ss = z * sd * Math.sqrt(L);
    out.push(drill({
      t: `Safety stock with z ${z}, daily σ ${sd} and ${L}-day lead time`,
      p: `Daily demand has standard deviation ${sd} units, lead time is ${L} days, and the service-level factor is z = ${z}. Compute the safety stock and explain how lead-time variability would change it.`,
      d: 2, tp: "supply-chain",
      i: `Safety stock = z·σd·√L = ${z}·${sd}·√${L} = ${f(ss)} units. Variable lead time adds its own term, z·√(L·σd² + d²·σL²), which can dominate when supplier timing is unreliable. Reducing lead time cuts safety stock with the square root.`,
      c: ["Safety stock = z·σd·√L", `Safety stock of about ${f(ss)} units`, "z links to the target service level", "Lead-time variability adds extra safety stock"],
      k: ["Safety stock buffers demand variation over the lead time", "Shorter lead times and better forecasts reduce inventory"],
    }));
  }

  for (const [lam, mu] of [[8, 10], [40, 50], [5, 6], [18, 20], [3, 5], [27, 30]]) {
    const rho = lam / mu;
    const L = rho / (1 - rho);
    const W = (1 / (mu - lam)) * 60;
    out.push(drill({
      t: `M/M/1 queue with arrivals ${lam}/h and service ${mu}/h`,
      p: `Customers arrive at ${lam} per hour and one server completes ${mu} per hour (Poisson arrivals, exponential service). Find utilisation, average number in the system, and average time in the system.`,
      d: 2, tp: "operations-research", tp2: "forecasting-simulation",
      i: `Utilisation ρ = λ/μ = ${f(rho)}. Average number in system L = ρ/(1−ρ) = ${f(L)}. Average time in system W = 1/(μ − λ) = ${f(W)} minutes. As ρ nears 1 delays grow without bound, which is why running a server near full utilisation is dangerous.`,
      c: ["Utilisation ρ = λ/μ", `ρ of ${f(rho)}`, `L of about ${f(L)} and W of about ${f(W)} minutes`, "Delay explodes as utilisation approaches 1"],
      k: ["Variability makes queues grow nonlinearly with load", "Adding capacity near saturation has outsized benefit"],
    }));
  }
  return out;
}

// ---------- Biomedical ----------
export function biomedicalDrills(): Q[] {
  const out: Q[] = [];

  for (const [hr, sv, edv] of [[72, 70, 140], [60, 90, 150], [100, 50, 120], [75, 65, 130], [55, 100, 160], [120, 40, 100]]) {
    const co = (hr * sv) / 1000;
    out.push(drill({
      t: `Cardiac output at ${hr} bpm and ${sv} mL stroke volume (EDV ${edv} mL)`,
      p: `A patient has heart rate ${hr} bpm, stroke volume ${sv} mL and end-diastolic volume ${edv} mL. Compute cardiac output and ejection fraction and comment on whether they are in the normal range.`,
      d: 1, tp: "physiology", tp2: "biosignals",
      i: `Cardiac output = HR × SV = ${hr}·${sv} = ${f(co)} L/min. Ejection fraction = SV/EDV = ${f((sv / edv) * 100)} percent. Normal resting output is about 4 to 8 L/min and normal EF is roughly 55 to 70 percent, so these values are ${co >= 4 && co <= 8 && sv / edv >= 0.5 ? "within the usual range" : "outside the usual range in at least one measure"}.`,
      c: ["Cardiac output = heart rate × stroke volume", `CO of about ${f(co)} L/min`, `Ejection fraction of about ${f((sv / edv) * 100)} percent`, "Comparison with normal ranges"],
      k: ["Output can be maintained by rate or by stroke volume", "Low EF suggests reduced contractility"],
    }));
  }

  for (const [dP, r, L] of [[10, 2, 10], [20, 1.5, 15], [5, 3, 8], [15, 1, 20], [8, 2.5, 12], [30, 0.5, 5]]) {
    const Q = (Math.PI * dP * 133.322 * (r / 1000) ** 4) / (8 * 3.5e-3 * (L / 100)) * 1e6;
    out.push(drill({
      t: `Poiseuille flow with ΔP ${dP} mmHg, radius ${r} mm and length ${L} cm`,
      p: `Blood (viscosity 3.5 mPa·s) flows through a vessel of radius ${r} mm and length ${L} cm under a ${dP} mmHg pressure drop. Find the flow rate and the flow if the radius is reduced by 20 percent.`,
      d: 3, tp: "biomechanics", tp2: "physiology",
      i: `Q = πΔP r⁴/(8μL) with ΔP = ${dP}·133.3 Pa, r = ${r}e-3 m, L = ${L / 100} m gives Q = ${f(Q)} mL/s. Flow scales with r⁴, so a 20 percent narrowing leaves 0.8⁴ = 0.41 of the flow, a 59 percent drop. That is why modest stenoses matter clinically.`,
      c: ["Poiseuille law Q = πΔP r⁴/(8μL)", `Flow of about ${f(Q)} mL/s`, "Flow depends on the fourth power of radius", "A 20 percent radius reduction cuts flow by about 59 percent"],
      k: ["Assumes steady laminar flow of a Newtonian fluid in a rigid tube", "Real blood is non-Newtonian and vessels are compliant"],
    }));
  }

  for (const [z, Co, Ci] of [[1, 5, 140], [1, 145, 12], [2, 2, 0.0001], [-1, 110, 10], [1, 4, 155], [2, 1.8, 0.0002]]) {
    const E = (61.5 / z) * Math.log10(Co / Ci);
    out.push(drill({
      t: `Nernst potential for z = ${z}, outside ${Co} mM, inside ${Ci} mM`,
      p: `An ion of valence ${z} has an extracellular concentration of ${Co} mM and an intracellular concentration of ${Ci} mM. At 37 °C find its Nernst equilibrium potential and say what it means for ion flow.`,
      d: 2, tp: "physiology", tp2: "biosignals",
      i: `E = (61.5 mV/z)·log10(Co/Ci) = (61.5/${z})·log10(${Co}/${Ci}) = ${f(E)} mV. At this membrane potential the electrical and concentration gradients balance and there is no net flux; away from it the ion flows toward E. Resting potential combines several ions weighted by permeability (Goldman equation).`,
      c: ["Nernst equation E = (61.5/z)·log10(Co/Ci) at 37 °C", `E of about ${f(E)} mV`, "No net flux at the equilibrium potential", "Resting potential combines ions via the Goldman equation"],
      k: ["Sign depends on valence and gradient direction", "Permeability determines each ion's weight in resting potential"],
    }));
  }

  for (const [th, c0, t] of [[6, 50, 12], [2, 10, 5], [24, 100, 48], [0.5, 5, 2], [12, 80, 30], [4, 20, 10]]) {
    const k = Math.LN2 / th;
    const c = c0 * Math.exp(-k * t);
    out.push(drill({
      t: `Drug concentration after ${t} h with a ${th} h half-life`,
      p: `A drug with first-order elimination and half-life ${th} h starts at ${c0} mg/L. Find the elimination rate constant, the concentration after ${t} h, and the time to fall to 10 percent.`,
      d: 2, tp: "physiology", tp2: "regulatory-affairs",
      i: `k = ln2/t½ = ${f(k, 3)} /h. C(t) = C0·e^(−kt) = ${c0}·e^(−${f(k, 3)}·${t}) = ${f(c)} mg/L. Time to 10 percent = ln(10)/k = ${f(Math.log(10) / k)} h, about 3.3 half-lives. At steady-state dosing, accumulation depends on dosing interval relative to half-life.`,
      c: ["First-order decay C = C0 e^(−kt) with k = ln2/t½", `k of about ${f(k, 3)} per hour`, `Concentration of about ${f(c)} mg/L after ${t} h`, `Time to 10 percent of about ${f(Math.log(10) / k)} h`],
      k: ["Each half-life halves the concentration", "Steady state is reached after about 4 to 5 half-lives of regular dosing"],
    }));
  }

  for (const [vin, g, cm, vcm] of [[500, 1000, 100, 10], [200, 2000, 90, 50], [1000, 500, 80, 20], [100, 5000, 110, 100], [300, 1000, 100, 5], [800, 800, 86, 30]]) {
    const vout = vin * 1e-6 * g;
    const cmrr = 10 ** (cm / 20);
    const err = (vcm * 1e-3) / cmrr * 1e6;
    out.push(drill({
      t: `Biopotential amplifier: ${vin} µV input, gain ${g}, CMRR ${cm} dB`,
      p: `An instrumentation amplifier with gain ${g} amplifies a ${vin} µV differential biopotential in the presence of ${vcm} mV common-mode interference. The CMRR is ${cm} dB. Find the output signal and the interference expressed at the input.`,
      d: 3, tp: "biosignals", tp2: "analog-electronics",
      i: `Output = ${vin}e-6·${g} = ${f(vout)} V. CMRR = 10^(${cm}/20) = ${f(cmrr)}, so the common-mode error referred to the input is ${vcm} mV/${f(cmrr)} = ${f(err)} µV, ${f((err / vin) * 100)} percent of the signal. Higher CMRR, shielding, driven-right-leg circuits and matched electrode impedances reduce interference.`,
      c: ["Output = gain × differential input", `Output of about ${f(vout)} V`, `Input-referred interference of about ${f(err)} µV from the CMRR`, "Mitigations such as a driven-right-leg circuit and shielding"],
      k: ["Electrode impedance mismatch converts common-mode into differential noise", "CMRR tends to fall with frequency, including at mains frequency"],
    }));
  }

  for (const [F, dm] of [[2000, 10], [3000, 12], [800, 6], [5000, 16], [1500, 8], [4000, 14]]) {
    const s = (4 * F) / (Math.PI * dm * dm);
    out.push(drill({
      t: `Implant stem stress under ${F} N in a ${dm} mm titanium rod`,
      p: `A ${dm} mm diameter titanium stem (yield about 880 MPa) carries an axial load of ${F} N. Find the axial stress, the static factor of safety, and why fatigue is the real concern for implants.`,
      d: 2, tp: "biomechanics", tp2: "biomaterials-devices",
      i: `σ = 4F/(πd²) = 4·${F}/(π·${dm}²) = ${f(s)} MPa. Static factor of safety = 880/${f(s)} = ${f(880 / s)}. Implants see millions of cycles during walking, so the fatigue endurance limit, notches, corrosion and stress concentrations govern, and testing follows standards such as ISO 7206 for hip stems.`,
      c: ["Axial stress σ = F/A with the circular area", `Stress of about ${f(s)} MPa`, `Static factor of safety of about ${f(880 / s)}`, "Fatigue governs implants over millions of cycles"],
      k: ["Static margin does not guarantee fatigue life", "Body fluids add corrosion fatigue"],
    }));
  }

  for (const [v, dm] of [[0.4, 25], [0.2, 15], [1.0, 25], [0.1, 5], [0.5, 20], [0.05, 1]]) {
    const Re = (1060 * v * (dm / 1000)) / 3.5e-3;
    out.push(drill({
      t: `Reynolds number of blood at ${v} m/s in a ${dm} mm vessel`,
      p: `Blood (density 1060 kg/m³, viscosity 3.5 mPa·s) moves at ${v} m/s in a vessel of ${dm} mm diameter. Compute the Reynolds number and say whether flow is expected to be laminar.`,
      d: 2, tp: "biomechanics", tp2: "physiology",
      i: `Re = ρvD/μ = 1060·${v}·${dm / 1000}/0.0035 = ${f(Re)}. ${Re < 2300 ? "This is well below the laminar limit of about 2300, so flow is laminar." : "This exceeds the laminar limit of about 2300, so turbulence is possible, as around heart valves or stenoses at high velocity."} Pulsatility and curved geometry make real vessel flow more complex.`,
      c: ["Re = ρvD/μ", `Re of about ${f(Re)}`, "Comparison with the 2300 laminar limit", "Pulsatile flow and geometry complicate the picture"],
      k: ["Turbulence near stenoses causes murmurs and damages blood cells", "Most vessel flow stays laminar"],
    }));
  }

  for (const [fs, bits, leads, hrs] of [[250, 12, 12, 24], [500, 16, 3, 24], [1000, 16, 12, 1], [250, 12, 1, 168], [360, 11, 2, 24], [2000, 24, 8, 2]]) {
    const rate = fs * bits * leads;
    const mb = (rate * 3600 * hrs) / 8 / 1e6;
    out.push(drill({
      t: `ECG data volume: ${leads} leads at ${fs} Hz, ${bits} bits for ${hrs} h`,
      p: `A recorder samples ${leads} channels at ${fs} Hz with ${bits} bits per sample for ${hrs} hours. Compute the raw data rate and file size, and justify the sampling rate with reference to ECG bandwidth.`,
      d: 2, tp: "biosignals", tp2: "signals-systems",
      i: `Data rate = ${fs}·${bits}·${leads} = ${rate} bit/s. Size = rate × time / 8 = ${f(mb)} MB over ${hrs} h. Diagnostic ECG content extends to roughly 150 Hz, so Nyquist needs more than 300 Hz in principle, and practical systems use 250 to 1000 Hz with anti-alias filtering. Compression can cut storage substantially.`,
      c: ["Data rate = sampling rate × bits × channels", `Rate of ${rate} bit/s`, `Size of about ${f(mb)} MB`, "Sampling rate justified by ECG bandwidth and Nyquist"],
      k: ["Anti-alias filtering is required before sampling", "Higher fidelity costs storage and battery"],
    }));
  }

  for (const [h, w, dose] of [[170, 70, 50], [160, 55, 100], [180, 85, 75], [150, 45, 120], [175, 95, 60], [165, 65, 90]]) {
    const bsa = Math.sqrt((h * w) / 3600);
    out.push(drill({
      t: `Body surface area and dose for ${h} cm, ${w} kg at ${dose} mg/m²`,
      p: `A patient is ${h} cm tall and ${w} kg. Use the Mosteller formula for body surface area and compute the dose for a protocol of ${dose} mg/m².`,
      d: 1, tp: "physiology", tp2: "regulatory-affairs",
      i: `BSA = √(height(cm) × weight(kg)/3600) = √(${h}·${w}/3600) = ${f(bsa, 3)} m². Dose = ${dose}·${f(bsa, 3)} = ${f(dose * bsa)} mg. Dosing by BSA is common in oncology; clinicians check rounding rules, organ function and dose caps.`,
      c: ["Mosteller BSA = √(h·w/3600)", `BSA of about ${f(bsa, 3)} m²`, `Dose of about ${f(dose * bsa)} mg`, "Clinical checks on rounding and caps"],
      k: ["Normalising to BSA reduces inter-patient variation for many drugs", "Extreme body size needs clinical judgement"],
    }));
  }

  for (const [co, hb, sa] of [[5, 15, 98], [4, 10, 95], [6, 14, 99], [3.5, 8, 90], [7, 16, 97], [5, 12, 92]]) {
    const cao2 = 1.34 * hb * (sa / 100);
    const do2 = co * cao2 * 10;
    out.push(drill({
      t: `Oxygen delivery with CO ${co} L/min, Hb ${hb} g/dL and SaO₂ ${sa}%`,
      p: `A patient has cardiac output ${co} L/min, haemoglobin ${hb} g/dL and arterial saturation ${sa} percent. Estimate arterial oxygen content (ignore dissolved oxygen) and oxygen delivery, and name the three levers that raise delivery.`,
      d: 2, tp: "physiology",
      i: `CaO₂ ≈ 1.34 × Hb × SaO₂ = 1.34·${hb}·${sa / 100} = ${f(cao2)} mL O₂/dL. DO₂ = CO × CaO₂ × 10 = ${co}·${f(cao2)}·10 = ${f(do2)} mL/min. The levers are cardiac output, haemoglobin and saturation. Normal delivery is about 1000 mL/min.`,
      c: ["CaO₂ ≈ 1.34·Hb·SaO₂", `CaO₂ of about ${f(cao2)} mL/dL`, `DO₂ of about ${f(do2)} mL/min`, "Cardiac output, haemoglobin and saturation are the levers"],
      k: ["Dissolved oxygen is small at normal PaO₂", "Delivery must exceed tissue demand with margin"],
    }));
  }
  return out;
}

// ---------- Environmental ----------
export function environmentalDrills(): Q[] {
  const out: Q[] = [];

  for (const [L0, k, t] of [[250, 0.23, 5], [300, 0.2, 3], [180, 0.3, 5], [400, 0.15, 7], [120, 0.25, 2], [500, 0.1, 5]]) {
    const y = L0 * (1 - Math.exp(-k * t));
    out.push(drill({
      t: `BOD exerted after ${t} days (L0 ${L0} mg/L, k ${k} /day)`,
      p: `Wastewater has an ultimate BOD of ${L0} mg/L and a first-order deoxygenation rate constant of ${k} per day. Find the BOD exerted after ${t} days and the fraction of ultimate BOD remaining.`,
      d: 2, tp: "water-treatment", tp2: "air-quality",
      i: `BOD_t = L0(1 − e^(−kt)) = ${L0}(1 − e^(−${k}·${t})) = ${f(y)} mg/L. Remaining = L0 − BOD_t = ${f(L0 - y)} mg/L, ${f(((L0 - y) / L0) * 100)} percent. The standard BOD5 test measures this at 5 days and 20 °C.`,
      c: ["First-order BOD curve BOD_t = L0(1 − e^(−kt))", `BOD exerted of about ${f(y)} mg/L`, `Remaining of about ${f(L0 - y)} mg/L`, "BOD5 is the standard 5 day, 20 °C test"],
      k: ["Rate constant depends on waste type and temperature", "Nitrogenous oxygen demand appears later"],
    }));
  }

  for (const [Qr, Cr, Qe, Ce] of [[10, 2, 0.5, 100], [50, 1, 2, 60], [5, 0.5, 0.2, 200], [100, 3, 5, 30], [20, 8, 1, 150], [2, 0.1, 0.1, 50]]) {
    const C = (Qr * Cr + Qe * Ce) / (Qr + Qe);
    out.push(drill({
      t: `River mixing: ${Qr} m³/s at ${Cr} mg/L plus ${Qe} m³/s at ${Ce} mg/L`,
      p: `A river carries ${Qr} m³/s at ${Cr} mg/L of a pollutant. An effluent adds ${Qe} m³/s at ${Ce} mg/L. Find the fully mixed concentration downstream and discuss what the calculation leaves out.`,
      d: 1, tp: "water-treatment", tp2: "groundwater-hydrology",
      i: `Mass balance: C = (Qr·Cr + Qe·Ce)/(Qr + Qe) = (${Qr}·${Cr} + ${Qe}·${Ce})/${Qr + Qe} = ${f(C)} mg/L. It assumes complete mixing and a conservative pollutant. Real rivers mix gradually, and decay, settling and dispersion change concentrations along the reach.`,
      c: ["Mass balance C = ΣQC/ΣQ", `Mixed concentration of about ${f(C)} mg/L`, "Assumes complete mixing and a conservative substance", "Decay, settling and dispersion are ignored"],
      k: ["Dilution reduces concentration but not total load", "Permits consider low-flow conditions such as 7Q10"],
    }));
  }

  for (const [d, rp] of [[50, 2650], [10, 2650], [100, 1200], [200, 2650], [20, 1050], [5, 2650]]) {
    const v = (9.81 * (rp - 998) * (d * 1e-6) ** 2) / (18 * 1e-3);
    const Re = (998 * v * d * 1e-6) / 1e-3;
    out.push(drill({
      t: `Stokes settling of a ${d} µm particle (density ${rp} kg/m³)`,
      p: `A ${d} µm spherical particle of density ${rp} kg/m³ settles in still water at 20 °C (density 998 kg/m³, viscosity 1 mPa·s). Compute the settling velocity, check the assumption, and say what it implies for clarifier design.`,
      d: 2, tp: "water-treatment", tp2: "fluid-mechanics",
      i: `Stokes: v = g(ρp − ρ)d²/(18μ) = 9.81·${rp - 998}·(${d}e-6)²/(18·0.001) = ${f(v * 1000)} mm/s. Check Re = ρvd/μ = ${f(Re)}; Stokes' law holds for Re below about 1, so it is ${Re < 1 ? "valid" : "not valid and a drag correlation is needed"}. Settling speed varies with the square of diameter, so coagulation and flocculation that build larger flocs greatly improve removal.`,
      c: ["Stokes law v = g(ρp − ρ)d²/(18μ)", `Velocity of about ${f(v * 1000)} mm/s`, "Check that the particle Reynolds number is below about 1", "Larger flocs settle much faster, so coagulation helps"],
      k: ["Velocity scales with diameter squared", "Clarifier overflow rate must be below the target particle's settling velocity"],
    }));
  }

  for (const [Q, V, A] of [[10000, 1500, 300], [5000, 800, 200], [20000, 2500, 500], [2000, 400, 100], [15000, 2000, 350], [8000, 1200, 260]]) {
    const hrt = (V / Q) * 24;
    const sor = Q / A;
    out.push(drill({
      t: `Clarifier detention time and overflow rate: ${Q} m³/d, ${V} m³, ${A} m²`,
      p: `A sedimentation basin of ${V} m³ and ${A} m² surface area treats ${Q} m³/day. Compute the hydraulic detention time and the surface overflow rate and comment on the design range.`,
      d: 2, tp: "water-treatment",
      i: `Detention time = V/Q = ${V}/${Q} d = ${f(hrt)} h. Surface overflow rate = Q/A = ${f(sor)} m³/m²·d. Typical clarifier overflow rates are around 20 to 40 m³/m²·d for primary treatment and lower for fine floc, so this design is ${sor > 50 ? "aggressive" : "within common ranges"}. Particles with settling velocity above the overflow rate are removed.`,
      c: ["Detention time = V/Q", `Detention of about ${f(hrt)} h`, `Overflow rate of about ${f(sor)} m³/m²·d`, "Particles faster than the overflow rate are removed"],
      k: ["Overflow rate depends on area, not depth", "Depth and baffling affect short-circuiting, not ideal removal"],
    }));
  }

  for (const [name, ppm, mw] of [["SO₂", 0.05, 64.06], ["NO₂", 0.1, 46.01], ["CO", 9, 28.01], ["O₃", 0.07, 48.0], ["benzene", 0.005, 78.11], ["H₂S", 0.02, 34.08]] as [string, number, number][]) {
    const ug = (ppm * mw * 1000) / 24.45;
    out.push(drill({
      t: `Convert ${ppm} ppm ${name} to µg/m³ at 25 °C`,
      p: `Convert ${ppm} ppm (by volume) of ${name} (molecular weight ${mw}) to µg/m³ at 25 °C and 1 atm, and say why regulations quote either unit.`,
      d: 1, tp: "air-quality", tp2: "environmental-regulation",
      i: `µg/m³ = ppm × MW × 1000/24.45 = ${ppm}·${mw}·1000/24.45 = ${f(ug)} µg/m³, using the molar volume 24.45 L/mol at 25 °C and 1 atm. Gases are often reported in ppm (a mixing ratio, temperature independent) and particulates in µg/m³, so conversions need the stated temperature and pressure.`,
      c: ["µg/m³ = ppm × MW × 1000 / 24.45 at 25 °C and 1 atm", `Result of about ${f(ug)} µg/m³`, "Molar volume of 24.45 L/mol at the reference condition", "Standards cite temperature and pressure"],
      k: ["ppm is a volume ratio and µg/m³ is a mass concentration", "The conversion changes with temperature and pressure"],
    }));
  }

  for (const [Q, C] of [[0.5, 30], [2, 10], [0.1, 200], [5, 2], [1, 50], [0.25, 120]]) {
    const load = Q * C * 86.4;
    out.push(drill({
      t: `Daily pollutant load of ${Q} m³/s at ${C} mg/L`,
      p: `An outfall discharges ${Q} m³/s with a pollutant concentration of ${C} mg/L. Compute the daily load in kg/day and explain why permits often limit load, not just concentration.`,
      d: 1, tp: "environmental-regulation", tp2: "water-treatment",
      i: `Load = Q·C × 86400 s/day with mg/L equal to g/m³: ${Q}·${C} = ${f(Q * C)} g/s, so ${f(load)} kg/day. Receiving waters respond to total mass, so a high-flow discharge can meet a concentration limit yet deliver a large load.`,
      c: ["Load = flow × concentration", "Unit handling: mg/L equals g/m³", `Load of about ${f(load)} kg/day`, "Permits limit mass load because receiving waters respond to total mass"],
      k: ["Dilution alone does not reduce load", "Total maximum daily load programs allocate load among sources"],
    }));
  }

  for (const [Q, dem, res] of [[5000, 1.8, 0.7], [20000, 2.2, 0.8], [1000, 4, 1], [50000, 1.2, 0.6], [8000, 3, 1], [300, 5, 1]]) {
    const dose = dem + res;
    const kg = (Q * dose) / 1000;
    out.push(drill({
      t: `Chlorine dose for ${Q} m³/d with ${dem} mg/L demand and ${res} mg/L residual`,
      p: `A plant treats ${Q} m³/day. The chlorine demand is ${dem} mg/L and the target residual is ${res} mg/L. Find the required dose and daily chlorine mass, and explain the purpose of the residual.`,
      d: 1, tp: "water-treatment", tp2: "environmental-regulation",
      i: `Dose = demand + residual = ${dem} + ${res} = ${f(dose)} mg/L. Mass = Q × dose = ${Q}·${f(dose)}/1000 = ${f(kg)} kg/day. The residual protects the distribution system against regrowth and recontamination, while limiting dose controls disinfection byproducts and taste.`,
      c: ["Dose = demand + residual", `Dose of ${f(dose)} mg/L`, `Mass of about ${f(kg)} kg/day`, "Residual protects the distribution system; byproducts limit the dose"],
      k: ["Demand is what reacts with organics and ammonia", "Contact time and concentration both determine inactivation (CT)"],
    }));
  }

  for (const [pop, kg, dens] of [[50000, 1.8, 600], [250000, 2.0, 650], [10000, 1.2, 500], [1000000, 1.6, 700], [75000, 2.2, 550], [400000, 1.4, 600]]) {
    const t = (pop * kg * 365) / 1000;
    const vol = (t * 1000) / dens;
    out.push(drill({
      t: `Landfill volume for ${pop} people at ${kg} kg/person/day`,
      p: `A community of ${pop} people produces ${kg} kg of solid waste per person per day. Estimate annual tonnage and the landfill volume needed per year at an in-place density of ${dens} kg/m³, and name two ways to reduce it.`,
      d: 1, tp: "waste-management",
      i: `Annual mass = ${pop}·${kg}·365/1000 = ${f(t)} tonnes. Volume = mass/density = ${f(t * 1000)}/${dens} = ${f(vol)} m³ per year, before cover soil. Diversion options include recycling, composting of organics, and waste-to-energy to cut landfilled volume.`,
      c: ["Annual mass = population × per-capita rate × 365", `About ${f(t)} tonnes per year`, `About ${f(vol)} m³ of airspace per year`, "Diversion options such as recycling and composting"],
      k: ["Compaction raises density and extends landfill life", "Cover soil adds volume"],
    }));
  }

  for (const [C0, k, Ct] of [[100, 0.05, 10], [500, 0.2, 50], [20, 0.01, 5], [1000, 0.5, 1], [80, 0.1, 8], [300, 0.03, 30]]) {
    const t = Math.log(C0 / Ct) / k;
    out.push(drill({
      t: `Time to degrade ${C0} to ${Ct} mg/L at k = ${k} /day`,
      p: `A contaminant degrades by first-order kinetics with k = ${k} per day. How long does it take to fall from ${C0} mg/L to ${Ct} mg/L, and what is its half-life?`,
      d: 1, tp: "remediation", tp2: "groundwater-hydrology",
      i: `t = ln(C0/C)/k = ln(${C0}/${Ct})/${k} = ${f(t)} days. Half-life = ln2/k = ${f(Math.LN2 / k)} days. Natural attenuation timelines follow from these rates, though real decay rates vary with temperature, oxygen and microbial populations.`,
      c: ["First-order decay t = ln(C0/C)/k", `Time of about ${f(t)} days`, `Half-life of about ${f(Math.LN2 / k)} days`, "Rates depend on temperature, oxygen and microbes"],
      k: ["Each half-life halves the concentration", "Field attenuation rates are site specific and need monitoring"],
    }));
  }

  for (const [T, DO] of [[20, 6.5], [25, 4.2], [10, 9.0], [30, 5.0], [15, 8.0], [5, 11.5]]) {
    const cs: Record<number, number> = { 5: 12.77, 10: 11.29, 15: 10.07, 20: 9.09, 25: 8.26, 30: 7.56 };
    const D = cs[T] - DO;
    out.push(drill({
      t: `Dissolved oxygen deficit at ${T} °C with ${DO} mg/L`,
      p: `At ${T} °C the saturation dissolved oxygen is ${cs[T]} mg/L. A river measures ${DO} mg/L. Find the DO deficit and percent saturation, and explain why warm water is more vulnerable.`,
      d: 1, tp: "water-treatment", tp2: "groundwater-hydrology",
      i: `Deficit D = Cs − DO = ${cs[T]} − ${DO} = ${f(D)} mg/L. Percent saturation = ${f((DO / cs[T]) * 100)}. Warm water holds less oxygen and bacterial oxygen demand runs faster, so the same organic load causes a deeper, faster oxygen sag; fish stress typically begins below about 5 mg/L.`,
      c: ["Deficit = saturation DO minus measured DO", `Deficit of about ${f(D)} mg/L`, `Saturation of about ${f((DO / cs[T]) * 100)} percent`, "Warm water holds less oxygen and has faster oxygen demand"],
      k: ["Reaeration replenishes oxygen toward saturation", "The oxygen sag curve balances deoxygenation against reaeration"],
    }));
  }
  return out;
}

// ---------- Computer science ----------
export function computerScienceDrills(): Q[] {
  const out: Q[] = [];

  for (const n of [100, 1000, 5000, 65536, 1e6, 1e9]) {
    const steps = Math.ceil(log2(n + 1));
    out.push(drill({
      t: `Worst-case binary search steps on ${f(n)} sorted items`,
      p: `How many comparisons does binary search need in the worst case on a sorted array of ${n} elements, and what is the time complexity? What precondition does it have?`,
      d: 1, tp: "algorithms", tp2: "data-structures",
      i: `Each step halves the range, so the worst case is ceil(log2(n + 1)) = ceil(log2(${n + 1})) = ${steps} comparisons. Time complexity is O(log n). The array must be sorted (or otherwise monotone) and support random access, otherwise a linear scan or a tree is needed.`,
      c: ["Binary search halves the search range each step", `About ${steps} comparisons in the worst case`, "O(log n) time complexity", "Requires sorted data with random access"],
      k: ["Logarithmic growth makes huge inputs cheap to search", "Sorting once pays off over many searches"],
    }));
  }

  for (const [n, m] of [[1000, 500], [10000, 10000], [500, 1000], [75, 100], [2000, 4000], [1000000, 200000]]) {
    const a = n / m;
    out.push(drill({
      t: `Hash table with ${f(n)} keys in ${f(m)} buckets using chaining`,
      p: `A chained hash table holds ${n} keys in ${m} buckets with a uniform hash function. Compute the load factor and the expected comparisons for successful and unsuccessful lookups, and say when to resize.`,
      d: 2, tp: "data-structures", tp2: "algorithms",
      i: `Load factor α = n/m = ${f(a)}. Expected comparisons: unsuccessful about α = ${f(a)}, successful about 1 + α/2 = ${f(1 + a / 2)}. Lookup stays O(1) on average while α is bounded, so tables resize (often doubling) when α passes roughly 0.75 to 1. Poor hash functions or adversarial keys can degrade it to O(n).`,
      c: ["Load factor α = n/m", `α of ${f(a)}`, `About ${f(1 + a / 2)} comparisons for a successful search`, "Resize when the load factor passes a threshold"],
      k: ["Average cost depends on the load factor, not on n alone", "Worst case needs a good hash function or randomisation"],
    }));
  }

  for (const n of [10, 100, 1000, 50, 2000, 10000]) {
    const ops = (n * (n - 1)) / 2;
    out.push(drill({
      t: `Operation count of a triangular nested loop with n = ${f(n)}`,
      p: `A loop runs i from 0 to n−1 and, inside it, j from 0 to i−1, doing one constant-time operation per inner iteration. Compute the exact count for n = ${n} and state the Big-O.`,
      d: 1, tp: "algorithms",
      i: `The inner loop runs i times for each i, so the total is 0 + 1 + … + (n−1) = n(n−1)/2 = ${f(ops)} for n = ${n}. That is O(n²). Doubling n roughly quadruples the work.`,
      c: ["Sum of 0 through n−1", `Exact count of ${f(ops)}`, "O(n²) complexity", "Doubling n quadruples the work"],
      k: ["Constants and lower-order terms drop out of Big-O", "Quadratic algorithms stop scaling past tens of thousands of items"],
    }));
  }

  for (const [n1, n2, t1] of [[1e5, 1e6, 0.2], [1e4, 1e5, 0.05], [1e6, 1e7, 1.5], [2e5, 2e6, 0.4], [5e4, 5e5, 0.12], [1e3, 1e4, 0.003]]) {
    const t2 = t1 * ((n2 * Math.log2(n2)) / (n1 * Math.log2(n1)));
    out.push(drill({
      t: `Scaling an O(n log n) sort from ${f(n1)} to ${f(n2)} items`,
      p: `An O(n log n) algorithm takes ${t1} s for n = ${f(n1)}. Estimate the time for n = ${f(n2)} assuming the same constant factor, and compare with what O(n²) would predict.`,
      d: 2, tp: "algorithms",
      i: `Ratio = (n2 log n2)/(n1 log n1) = ${f((n2 * Math.log2(n2)) / (n1 * Math.log2(n1)))}, so the new time is about ${f(t2)} s. An O(n²) algorithm would scale by (${f(n2 / n1)})² = ${f((n2 / n1) ** 2)}, giving ${f(t1 * (n2 / n1) ** 2)} s. Estimates ignore cache effects and memory limits that appear at large n.`,
      c: ["Scale by (n2 log n2)/(n1 log n1)", `New time of about ${f(t2)} s`, `Quadratic prediction of about ${f(t1 * (n2 / n1) ** 2)} s for comparison`, "Cache and memory effects limit such extrapolation"],
      k: ["n log n grows only slightly faster than linear", "Asymptotics guide scaling but constants decide small inputs"],
    }));
  }

  for (const [bw, rtt, mb] of [[100, 40, 50], [1000, 10, 500], [10, 200, 5], [50, 80, 200], [500, 20, 1000], [1, 300, 2]]) {
    const bdp = (bw * 1e6 * rtt * 1e-3) / 8 / 1024;
    const t = (mb * 8) / bw + rtt / 1000;
    out.push(drill({
      t: `Bandwidth-delay product at ${bw} Mbps and ${rtt} ms RTT`,
      p: `A link has ${bw} Mbps bandwidth and ${rtt} ms round-trip time. Compute the bandwidth-delay product and the ideal time to send a ${mb} MB file, and explain why TCP window size matters.`,
      d: 2, tp: "networking",
      i: `BDP = bandwidth × RTT = ${bw}e6·${rtt}e-3/8 = ${f(bdp)} KiB of data in flight. Ideal transfer time ≈ size/bandwidth + RTT = ${mb}·8/${bw} + ${rtt / 1000} = ${f(t)} s. To fill the pipe, the TCP window must be at least the BDP, otherwise throughput is capped at window/RTT.`,
      c: ["BDP = bandwidth × round-trip time", `BDP of about ${f(bdp)} KiB`, `Ideal transfer time of about ${f(t)} s`, "Window must be at least the BDP to fill the link"],
      k: ["Long fat networks need large windows or scaling", "Loss and slow start make real transfers slower than the ideal"],
    }));
  }

  for (const n of [200, 50000, 3e6, 8e9, 1e12, 60]) {
    const bits = Math.ceil(log2(n));
    out.push(drill({
      t: `Bits needed to identify ${f(n)} distinct items`,
      p: `How many bits are needed to give each of ${f(n)} items a unique identifier, and how many bytes does that take when stored in whole bytes?`,
      d: 1, tp: "data-structures", tp2: "systems-design",
      i: `Bits = ceil(log2(n)) = ceil(log2(${f(n)})) = ${bits}. Stored in whole bytes that is ${Math.ceil(bits / 8)} byte(s). Provision headroom for growth, since changing identifier width later is expensive.`,
      c: ["Bits = ceil(log2 N)", `${bits} bits`, `${Math.ceil(bits / 8)} bytes in whole bytes`, "Headroom for growth"],
      k: ["Each extra bit doubles the number of identifiers", "Random identifiers need extra bits to keep collisions negligible"],
    }));
  }

  for (const [a, b, k] of [[2, 2, 1], [4, 2, 1], [1, 2, 0], [3, 2, 1], [2, 2, 2], [8, 2, 2]]) {
    const lg = Math.log(a) / Math.log(b);
    const res = Math.abs(lg - k) < 1e-9 ? `Θ(n^${k} log n)` : lg > k ? `Θ(n^${f(lg)})` : `Θ(n^${k})`;
    out.push(drill({
      t: `Solve T(n) = ${a}T(n/${b}) + Θ(n^${k}) with the master theorem`,
      p: `Solve the recurrence T(n) = ${a}·T(n/${b}) + Θ(n^${k}) using the master theorem, and name an algorithm with a similar recurrence if you know one.`,
      d: 2, tp: "algorithms",
      i: `Compare n^(log_b a) = n^${f(lg)} with the work term n^${k}. ${Math.abs(lg - k) < 1e-9 ? "They are equal, so every level costs the same and the result is Θ(n^k log n)" : lg > k ? "The recursion's leaves dominate, so the result is Θ(n^(log_b a))" : "The top-level work dominates, so the result is Θ(f(n))"}: T(n) = ${res}. ${a === 2 && k === 1 ? "Merge sort has this recurrence." : a === 1 && k === 0 ? "Binary search has this recurrence." : ""}`,
      c: ["Compare n^(log_b a) with f(n)", `log_b a = ${f(lg)}`, `Result ${res}`, "Case chosen: equal, leaves dominate, or root dominates"],
      k: ["The theorem has three cases depending on which term dominates", "It requires equal-size subproblems and polynomial work"],
    }));
  }

  for (const [fo, N] of [[100, 1e6], [200, 1e9], [50, 1e5], [500, 1e7], [1000, 1e12], [16, 65536]]) {
    const h = Math.ceil(Math.log(N) / Math.log(fo));
    out.push(drill({
      t: `B-tree height with fan-out ${fo} and ${f(N)} records`,
      p: `A B-tree has fan-out about ${fo} per node and stores ${f(N)} records. Estimate its height and the number of disk reads for a point lookup, and explain why wide nodes suit disks.`,
      d: 2, tp: "databases", tp2: "data-structures",
      i: `Height ≈ ceil(log_${fo}(${f(N)})) = ${h}. A lookup reads about ${h} pages, fewer if the top levels are cached. B-trees use wide nodes because a disk or SSD page read costs the same whether it holds a few keys or hundreds, so high fan-out minimises reads.`,
      c: ["Height ≈ log base fan-out of N", `Height of about ${h}`, `About ${h} page reads per lookup`, "Wide nodes minimise I/O per lookup"],
      k: ["Top levels are usually cached in memory", "Writes cause splits that keep the tree balanced"],
    }));
  }

  for (const [a1, a2] of [[0.99, 0.999], [0.999, 0.999], [0.95, 0.99], [0.9999, 0.999], [0.98, 0.98], [0.995, 0.9995]]) {
    const series = a1 * a2;
    const par = 1 - (1 - a1) ** 2;
    out.push(drill({
      t: `Availability of components ${a1 * 100}% and ${a2 * 100}% in series`,
      p: `Two services with availabilities ${a1} and ${a2} must both work for a request to succeed. Compute the availability of the chain and annual downtime. Then compute the availability if the first service is run as two independent replicas.`,
      d: 2, tp: "systems-design", tp2: "testing-reliability",
      i: `Series availability = ${a1}·${a2} = ${f(series, 5)}, downtime about ${f((1 - series) * 525600)} minutes per year. Two independent replicas of the first service give 1 − (1 − ${a1})² = ${f(par, 6)}, and the chain becomes ${f(par * a2, 6)}. Redundancy helps only if failures are independent, and shared dependencies remain single points of failure.`,
      c: ["Series availability is the product", `Chain availability of about ${f(series, 5)}`, `About ${f((1 - series) * 525600)} minutes of downtime per year`, "Parallel replicas give 1 − (1 − a)²"],
      k: ["Every serial dependency lowers availability", "Correlated failures undermine redundancy"],
    }));
  }

  for (const [n, m] of [[23, 365], [1000, 1e6], [50000, 2 ** 32], [100, 1e4], [30, 365], [10000, 1e9]]) {
    const p = 1 - Math.exp(-(n * (n - 1)) / (2 * m));
    out.push(drill({
      t: `Collision probability for ${f(n)} items in ${f(m)} slots`,
      p: `${n} items are hashed uniformly into ${m} slots. Use the birthday approximation to estimate the probability that at least two collide, and explain what it means for choosing identifier length.`,
      d: 2, tp: "data-structures", tp2: "security",
      i: `p ≈ 1 − exp(−n(n−1)/(2m)) = 1 − exp(−${n}·${n - 1}/(2·${f(m)})) = ${f(p, 3)}. Collisions appear around √m items, far fewer than m, so identifiers need roughly twice as many bits as log2 of the expected population to keep collisions rare.`,
      c: ["Birthday approximation p ≈ 1 − exp(−n²/2m)", `Probability of about ${f(p, 3)}`, "Collisions appear near √m items", "Identifier length must exceed log2(population) substantially"],
      k: ["Pairwise comparisons grow quadratically", "Hash-based IDs need space for the birthday bound"],
    }));
  }
  return out;
}
