import type { Q } from "./types";
import { G0, drill, f } from "./util";

// ---------- Mechanical ----------
export function mechanicalDrills(): Q[] {
  const out: Q[] = [];

  for (const [w, L, E, I] of [[5, 4, 200, 8000], [8, 3, 200, 5000], [12, 5, 70, 12000], [3, 2.5, 200, 1500], [10, 6, 200, 25000], [6, 4.5, 70, 9000]]) {
    const d = (5 * w * 1e3 * L ** 4) / (384 * E * 1e9 * I * 1e-8) * 1000;
    out.push(drill({
      t: `Midspan deflection of a ${L} m beam carrying ${w} kN/m (E = ${E} GPa, I = ${I} cm⁴)`,
      p: `A simply supported beam spans ${L} m and carries a uniformly distributed load of ${w} kN/m. E = ${E} GPa and I = ${I} cm⁴. Find the midspan deflection and say whether it looks acceptable for a floor or machine frame (use span/360 as the limit).`,
      d: 2, tp: "statics-dynamics", tp2: "machine-design",
      i: `Use δ = 5wL⁴/(384EI). Convert to SI: w = ${w * 1000} N/m, E = ${E}e9 Pa, I = ${I}e-8 m⁴. δ = 5·${w * 1000}·${L}⁴ / (384·${E}e9·${I}e-8) = ${f(d)} mm. The span/360 limit is ${f((L * 1000) / 360)} mm, so the beam ${d <= (L * 1000) / 360 ? "passes" : "fails"} the serviceability check.`,
      c: ["Deflection formula 5wL⁴/(384EI) for a simply supported UDL beam", `Midspan deflection of about ${f(d)} mm`, "Consistent SI units (N, m, Pa, m⁴)", `Comparison with span/360 = ${f((L * 1000) / 360)} mm`],
      k: ["Deflection grows with the fourth power of span, so small span changes matter", "Serviceability is checked separately from strength"],
    }));
  }

  for (const [F, dm, L, E] of [[20, 10, 1.5, 200], [50, 16, 2, 200], [30, 12, 1, 70], [100, 25, 3, 200], [15, 8, 0.8, 110], [40, 20, 2.5, 70]]) {
    const A = (Math.PI * dm * dm) / 4;
    const s = (F * 1000) / A;
    const e = ((s / (E * 1000)) * L * 1000);
    out.push(drill({
      t: `Stress and elongation of a ${dm} mm rod under ${F} kN (${L} m, E = ${E} GPa)`,
      p: `A round rod of diameter ${dm} mm and length ${L} m carries an axial tensile load of ${F} kN. E = ${E} GPa. Find the axial stress and the elongation.`,
      d: 1, tp: "statics-dynamics", tp2: "mechanical-properties",
      i: `A = πd²/4 = ${f(A)} mm². Stress σ = F/A = ${F * 1000}/${f(A)} = ${f(s)} MPa. Strain ε = σ/E = ${f(s)}/${E * 1000} = ${f(s / (E * 1000), 3)}. Elongation δ = εL = ${f(e)} mm. Check σ against the yield strength to confirm the rod stays elastic.`,
      c: ["Axial stress σ = F/A with the cross-sectional area from the diameter", `Stress of about ${f(s)} MPa`, `Elongation δ = FL/(AE) of about ${f(e)} mm`, "Check that the stress is below yield so Hooke's law applies"],
      k: ["Hooke's law applies only in the elastic range", "Elongation scales linearly with length and load and inversely with area and modulus"],
    }));
  }

  for (const [k, A, T1, T2, L] of [[0.8, 12, 22, -5, 250], [1.4, 8, 30, 10, 200], [0.04, 20, 20, -10, 100], [45, 0.05, 300, 100, 20], [0.6, 15, 25, 5, 150], [200, 0.01, 150, 50, 10]]) {
    const q = (k * A * (T1 - T2)) / (L / 1000);
    out.push(drill({
      t: `Steady conduction through a ${L} mm layer with k = ${k} W/m·K`,
      p: `A flat layer ${L} mm thick, area ${A} m², thermal conductivity ${k} W/m·K, has surfaces held at ${T1} °C and ${T2} °C. Find the steady heat flow and describe how it changes if the thickness doubles.`,
      d: 1, tp: "heat-transfer",
      i: `Fourier's law for a plane wall: Q = kAΔT/L = ${k}·${A}·${T1 - T2}/${L / 1000} = ${f(q)} W. Q is inversely proportional to thickness, so doubling the thickness halves the heat flow to ${f(q / 2)} W.`,
      c: ["Fourier's law Q = kAΔT/L for steady one-dimensional conduction", `Heat flow of about ${f(q)} W`, "Thickness converted to metres", "Doubling thickness halves Q"],
      k: ["Conductive resistance is L/(kA), so series layers add", "Steady state means no storage and constant heat flow through the wall"],
    }));
  }

  for (const [fl, v, D] of [["water", 1.5, 25], ["water", 0.05, 10], ["air", 12, 100], ["oil", 0.8, 50], ["oil", 3, 25], ["air", 0.3, 20]] as [string, number, number][]) {
    const props: Record<string, [number, number]> = { water: [998, 1.0e-3], air: [1.2, 1.8e-5], oil: [870, 0.08] };
    const [rho, mu] = props[fl];
    const Re = (rho * v * (D / 1000)) / mu;
    const regime = Re < 2300 ? "laminar" : Re > 4000 ? "turbulent" : "transitional";
    out.push(drill({
      t: `Flow regime of ${fl} at ${v} m/s in a ${D} mm pipe`,
      p: `${fl[0].toUpperCase() + fl.slice(1)} (density ${rho} kg/m³, viscosity ${mu} Pa·s) flows at ${v} m/s through a ${D} mm diameter pipe. Compute the Reynolds number and state the flow regime.`,
      d: 1, tp: "fluid-mechanics",
      i: `Re = ρvD/μ = ${rho}·${v}·${D / 1000}/${mu} = ${f(Re)}. Since Re < 2300 is laminar and Re > 4000 is turbulent, the flow is ${regime}. This sets which friction-factor correlation to use for pressure drop.`,
      c: ["Reynolds number Re = ρvD/μ", `Re of about ${f(Re)}`, `Classification as ${regime} using the 2300 and 4000 thresholds`, "Diameter converted to metres"],
      k: ["Re compares inertial to viscous forces", "The regime decides the friction factor correlation, such as 64/Re for laminar flow"],
    }));
  }

  for (const [Q, H, eta] of [[20, 30, 0.7], [50, 15, 0.75], [8, 60, 0.6], [100, 25, 0.8], [35, 45, 0.72], [12, 10, 0.65]]) {
    const hyd = (1000 * 9.81 * (Q / 1000) * H) / 1000;
    const shaft = hyd / eta;
    out.push(drill({
      t: `Shaft power of a pump moving ${Q} L/s of water against ${H} m`,
      p: `A pump delivers ${Q} L/s of water against a total head of ${H} m with an overall efficiency of ${eta * 100}%. Find the hydraulic power and the shaft power needed.`,
      d: 1, tp: "fluid-mechanics", tp2: "thermodynamics",
      i: `Hydraulic power = ρgQH = 1000·9.81·${Q / 1000}·${H} = ${f(hyd)} kW. Shaft power = hydraulic power / η = ${f(hyd)}/${eta} = ${f(shaft)} kW. Choose a motor with margin above this, typically 10 to 15 percent.`,
      c: ["Hydraulic power P = ρgQH", `Hydraulic power of about ${f(hyd)} kW`, `Shaft power of about ${f(shaft)} kW after dividing by efficiency`, "Flow rate converted from L/s to m³/s"],
      k: ["Efficiency converts useful hydraulic power into required input power", "Motor selection adds margin over the calculated shaft power"],
    }));
  }

  for (const [T, dm] of [[200, 30], [500, 40], [1200, 50], [80, 20], [2500, 60], [350, 35]]) {
    const tau = (16 * T) / (Math.PI * (dm / 1000) ** 3) / 1e6;
    out.push(drill({
      t: `Maximum shear stress in a ${dm} mm shaft carrying ${T} N·m`,
      p: `A solid circular shaft of diameter ${dm} mm transmits a torque of ${T} N·m. Find the maximum shear stress and say where it occurs.`,
      d: 2, tp: "machine-design", tp2: "statics-dynamics",
      i: `For a solid circular shaft τmax = 16T/(πd³) = 16·${T}/(π·${dm / 1000}³) = ${f(tau)} MPa. It occurs at the outer surface and is zero on the axis. Compare with the allowable shear stress, about half of yield for ductile steel, and add stress concentration at keyways.`,
      c: ["Torsion formula τ = Tr/J which gives 16T/(πd³) for a solid shaft", `Maximum shear stress of about ${f(tau)} MPa`, "Maximum stress at the outer surface", "Diameter converted to metres"],
      k: ["Shear stress varies linearly with radius in a circular shaft", "Keyways and shoulders add stress concentration that must be included"],
    }));
  }

  for (const [mat, a, L, dT] of [["steel", 12, 10, 40], ["aluminum", 23, 2, 80], ["copper", 17, 5, 100], ["steel", 12, 30, 25], ["titanium", 9, 1.5, 200], ["aluminum", 23, 0.8, 120]] as [string, number, number, number][]) {
    const dl = a * 1e-6 * L * dT * 1000;
    out.push(drill({
      t: `Thermal growth of a ${L} m ${mat} part over ${dT} K`,
      p: `A ${mat} bar (α = ${a}×10⁻⁶ /K) is ${L} m long and warms by ${dT} K. How much does it lengthen, and what happens to the stress if both ends are rigidly fixed?`,
      d: 1, tp: "thermodynamics", tp2: "design-tolerancing",
      i: `Free expansion δ = αLΔT = ${a}e-6·${L}·${dT} = ${f(dl)} mm. If both ends are rigidly constrained the expansion is blocked and a compressive stress σ = EαΔT develops, which can be hundreds of MPa for steel, so expansion joints or sliding supports are used.`,
      c: ["Linear thermal expansion δ = αLΔT", `Elongation of about ${f(dl)} mm`, "Constrained expansion produces compressive stress EαΔT", "Design response such as expansion joints or sliding supports"],
      k: ["Free expansion creates no stress; constraint creates it", "Different materials expand differently, which matters at joints"],
    }));
  }

  for (const [Th, Tc] of [[500, 30], [300, 25], [800, 40], [150, 20], [1000, 50], [250, -10]]) {
    const eta = 1 - (Tc + 273.15) / (Th + 273.15);
    const cop = (Tc + 273.15) / (Th - Tc);
    out.push(drill({
      t: `Carnot limits between ${Th} °C and ${Tc} °C`,
      p: `A reversible heat engine operates between a hot reservoir at ${Th} °C and a cold reservoir at ${Tc} °C. Find its efficiency. Then find the ideal cooling COP of a reversible refrigerator between the same two temperatures.`,
      d: 2, tp: "thermodynamics",
      i: `Convert to kelvin first: Th = ${f(Th + 273.15)} K, Tc = ${f(Tc + 273.15)} K. Carnot efficiency = 1 − Tc/Th = ${f(eta * 100)} percent. The reversible refrigeration COP = Tc/(Th − Tc) = ${f(cop)}. Real machines fall well below these limits because of irreversibilities.`,
      c: ["Temperatures converted to kelvin", `Carnot efficiency 1 − Tc/Th of about ${f(eta * 100)} percent`, `Refrigerator COP Tc/(Th − Tc) of about ${f(cop)}`, "Carnot values are an upper bound for real cycles"],
      k: ["The second law caps efficiency by the temperature ratio, not by the working fluid", "Raising the hot temperature or lowering the cold one improves the limit"],
      m: ["Using Celsius instead of kelvin in the ratio"],
    }));
  }

  for (const [Sy, s] of [[250, 120], [350, 150], [276, 200], [500, 180], [215, 90], [1000, 400]]) {
    const fs = Sy / s;
    out.push(drill({
      t: `Factor of safety for ${s} MPa working stress on ${Sy} MPa yield material`,
      p: `A component sees a peak working stress of ${s} MPa. The material yield strength is ${Sy} MPa. Compute the factor of safety against yielding and comment on whether it is adequate for a general machine part.`,
      d: 1, tp: "machine-design", tp2: "fatigue-failure",
      i: `FS = Sy/σ = ${Sy}/${s} = ${f(fs)}. Typical static design factors are 1.5 to 3 for well-known loads and materials, so ${fs < 1.5 ? "this is too low" : fs < 3 ? "this is in the usual range" : "this is conservative"}. For cyclic loading the endurance limit, not yield, governs and the margin must be checked against fatigue.`,
      c: ["Factor of safety FS = yield strength / working stress", `FS of about ${f(fs)}`, "Comparison with typical design factors of roughly 1.5 to 3", "Fatigue loading needs a separate endurance-based check"],
      k: ["The required factor depends on uncertainty in loads, material and consequences of failure", "A static factor of safety does not cover fatigue or buckling"],
    }));
  }

  for (const [N1, N2, N3, N4, rpm, T] of [[20, 60, 15, 45, 1800, 10], [18, 54, 24, 72, 1200, 25], [25, 50, 20, 80, 3000, 5], [15, 45, 30, 60, 900, 40], [22, 66, 18, 54, 1500, 12], [30, 60, 20, 100, 2400, 8]]) {
    const ratio = (N2 / N1) * (N4 / N3);
    out.push(drill({
      t: `Two-stage gear train ${N1}/${N2} then ${N3}/${N4} at ${rpm} rpm`,
      p: `A compound gear train has a ${N1}-tooth pinion driving a ${N2}-tooth gear, and on the same shaft a ${N3}-tooth pinion driving a ${N4}-tooth gear. The input turns at ${rpm} rpm with ${T} N·m. Find the overall ratio, output speed and ideal output torque.`,
      d: 2, tp: "machine-design",
      i: `Overall ratio = (${N2}/${N1})·(${N4}/${N3}) = ${f(ratio)}. Output speed = ${rpm}/${f(ratio)} = ${f(rpm / ratio)} rpm. Ideal output torque = ${T}·${f(ratio)} = ${f(T * ratio)} N·m, since power is conserved in an ideal train. Real torque is lower by the gear mesh efficiency, about 97 to 99 percent per stage.`,
      c: ["Overall ratio is the product of driven over driver teeth for each stage", `Ratio of about ${f(ratio)}`, `Output speed of about ${f(rpm / ratio)} rpm`, `Ideal output torque of about ${f(T * ratio)} N·m with losses noted`],
      k: ["Speed reduction multiplies torque because power is conserved", "Each mesh costs a little efficiency so real torque is slightly lower"],
    }));
  }
  return out;
}

// ---------- Aerospace ----------
const MU = 398600;
const RE = 6378;

export function aerospaceDrills(): Q[] {
  const out: Q[] = [];

  for (const [isp, m0, mf] of [[300, 50000, 15000], [350, 120000, 30000], [450, 8000, 3000], [3000, 1200, 900], [280, 25000, 9000], [380, 60000, 20000]]) {
    const dv = isp * G0 * Math.log(m0 / mf);
    out.push(drill({
      t: `Delta-v of a ${m0} kg stage with Isp ${isp} s and ${mf} kg dry mass`,
      p: `A stage has an initial mass of ${m0} kg and a final mass of ${mf} kg after burning its propellant, with specific impulse ${isp} s. Compute the ideal delta-v and the propellant mass fraction.`,
      d: 2, tp: "propulsion", tp2: "orbital-mechanics",
      i: `Tsiolkovsky: Δv = Isp·g0·ln(m0/mf) = ${isp}·9.80665·ln(${m0}/${mf}) = ${f(dv)} m/s. Propellant mass fraction = (m0 − mf)/m0 = ${f(((m0 - mf) / m0) * 100)} percent. Gravity and drag losses mean the delta-v needed from the ground is higher than the orbital velocity alone.`,
      c: ["Rocket equation Δv = Isp·g0·ln(m0/mf)", `Delta-v of about ${f(dv)} m/s`, `Propellant fraction of about ${f(((m0 - mf) / m0) * 100)} percent`, "Mention of gravity and drag losses in real launches"],
      k: ["Delta-v grows only logarithmically with mass ratio", "Higher Isp reduces the propellant needed for the same delta-v"],
    }));
  }

  for (const h of [400, 550, 800, 1200, 20200, 35786]) {
    const r = RE + h;
    const v = Math.sqrt(MU / r);
    const T = 2 * Math.PI * Math.sqrt(r ** 3 / MU);
    out.push(drill({
      t: `Circular orbit speed and period at ${h} km altitude`,
      p: `A satellite is in a circular orbit ${h} km above the Earth's surface (Earth radius 6378 km, μ = 398600 km³/s²). Find its orbital speed and period.`,
      d: 1, tp: "orbital-mechanics",
      i: `Orbit radius r = 6378 + ${h} = ${r} km. Circular speed v = √(μ/r) = ${f(v)} km/s. Period T = 2π√(r³/μ) = ${f(T / 60)} minutes (${f(T / 3600)} hours). Higher orbits are slower and have longer periods.`,
      c: ["Radius measured from Earth's centre, not the surface", `Orbital speed v = √(μ/r) of about ${f(v)} km/s`, `Period of about ${f(T / 60)} minutes`, "Higher orbits move more slowly"],
      k: ["Gravity supplies exactly the centripetal force in a circular orbit", "Kepler's third law links period to the cube of radius"],
      m: ["Using altitude instead of radius from Earth's centre"],
    }));
  }

  for (const [r1, r2] of [[6778, 42164], [6778, 26560], [6928, 12000], [7000, 12000], [6678, 42164], [7200, 20000]]) {
    const a = (r1 + r2) / 2;
    const dv1 = Math.sqrt(MU / r1) * (Math.sqrt((2 * r2) / (r1 + r2)) - 1);
    const dv2 = Math.sqrt(MU / r2) * (1 - Math.sqrt((2 * r1) / (r1 + r2)));
    const tt = Math.PI * Math.sqrt(a ** 3 / MU);
    out.push(drill({
      t: `Hohmann transfer from a ${r1} km to a ${r2} km circular orbit`,
      p: `Compute the two burns and total delta-v for a Hohmann transfer between coplanar circular orbits of radius ${r1} km and ${r2} km around Earth (μ = 398600 km³/s²), and the transfer time.`,
      d: 3, tp: "orbital-mechanics",
      i: `Transfer ellipse semi-major axis a = (${r1}+${r2})/2 = ${f(a)} km. Burn 1: Δv1 = √(μ/r1)(√(2r2/(r1+r2)) − 1) = ${f(dv1)} km/s. Burn 2: Δv2 = √(μ/r2)(1 − √(2r1/(r1+r2))) = ${f(dv2)} km/s. Total Δv = ${f(dv1 + dv2)} km/s. Transfer time is half the ellipse period, π√(a³/μ) = ${f(tt / 3600)} hours.`,
      c: ["Hohmann transfer uses two tangential burns on an ellipse touching both orbits", `First burn of about ${f(dv1)} km/s`, `Second burn of about ${f(dv2)} km/s and total of about ${f(dv1 + dv2)} km/s`, `Transfer time of about ${f(tt / 3600)} hours`],
      k: ["It is the minimum-delta-v two-impulse transfer between coplanar circular orbits", "Transfer time is half the period of the transfer ellipse"],
    }));
  }

  for (const [V, S, CL, rho] of [[60, 16, 1.2, 1.225], [250, 120, 0.5, 0.38], [80, 20, 1.0, 1.225], [300, 360, 0.45, 0.3], [40, 10, 1.4, 1.225], [200, 50, 0.6, 0.5]]) {
    const L = 0.5 * rho * V * V * S * CL;
    out.push(drill({
      t: `Lift on a ${S} m² wing at ${V} m/s with CL ${CL}`,
      p: `A wing of area ${S} m² flies at ${V} m/s in air of density ${rho} kg/m³ with a lift coefficient of ${CL}. Compute the lift and the weight it can support. How does lift change if speed rises by 10 percent?`,
      d: 1, tp: "aerodynamics", tp2: "flight-dynamics",
      i: `L = ½ρV²S·CL = 0.5·${rho}·${V}²·${S}·${CL} = ${f(L)} N, which supports a weight of ${f(L / G0)} kg in level flight. Lift scales with V², so a 10 percent speed increase raises lift by 21 percent at constant CL and density.`,
      c: ["Lift equation L = ½ρV²S·CL", `Lift of about ${f(L)} N`, `Equivalent supported mass of about ${f(L / G0)} kg`, "Lift rises with the square of speed (+21 percent for +10 percent speed)"],
      k: ["In level flight lift equals weight", "Air density and speed both change the lift available"],
    }));
  }

  for (const [T, V] of [[288, 250], [216.65, 240], [300, 100], [216.65, 590], [250, 300], [273, 340]]) {
    const a = Math.sqrt(1.4 * 287 * T);
    const M = V / a;
    const reg = M < 0.3 ? "incompressible" : M < 0.8 ? "subsonic compressible" : M < 1.2 ? "transonic" : "supersonic";
    out.push(drill({
      t: `Mach number at ${V} m/s in ${T} K air`,
      p: `An aircraft flies at ${V} m/s where the air temperature is ${T} K. Find the speed of sound, the Mach number, and the flow regime.`,
      d: 1, tp: "compressible-flow", tp2: "aerodynamics",
      i: `Speed of sound a = √(γRT) = √(1.4·287·${T}) = ${f(a)} m/s. Mach number M = V/a = ${f(M)}. That is ${reg} flow. Compressibility effects such as shock waves and wave drag matter above roughly M 0.8 to 0.85.`,
      c: ["Speed of sound a = √(γRT) with temperature in kelvin", `a of about ${f(a)} m/s`, `Mach number of about ${f(M)}`, `Regime identified as ${reg}`],
      k: ["Speed of sound depends on temperature, not pressure", "Compressibility effects grow as Mach number approaches 1"],
    }));
  }

  for (const [alt, rho, V] of [["sea level", 1.225, 70], ["3 km", 0.909, 150], ["10 km", 0.414, 230], ["15 km", 0.194, 200], ["20 km", 0.0889, 300], ["30 km", 0.0184, 500]] as [string, number, number][]) {
    const q = 0.5 * rho * V * V;
    out.push(drill({
      t: `Dynamic pressure at ${alt} and ${V} m/s`,
      p: `Air density at ${alt} is ${rho} kg/m³ and the vehicle moves at ${V} m/s. Compute the dynamic pressure and explain why it matters for structural loads and control surfaces.`,
      d: 1, tp: "aerodynamics", tp2: "aerospace-structures",
      i: `q = ½ρV² = 0.5·${rho}·${V}² = ${f(q)} Pa (${f(q / 1000)} kPa). Aerodynamic forces and hinge moments scale with q, so peak loading on a launch vehicle occurs at max-q where rising speed meets falling density.`,
      c: ["Dynamic pressure q = ½ρV²", `q of about ${f(q)} Pa`, "Aerodynamic forces scale with q", "Max-q as the peak structural loading point on ascent"],
      k: ["Speed increases q while altitude gain decreases density", "Control authority and loads both scale with q"],
    }));
  }

  for (const [md, ve] of [[250, 2500], [1000, 3000], [5, 4400], [12, 2200], [400, 3300], [0.002, 30000]]) {
    const F = md * ve;
    out.push(drill({
      t: `Thrust and Isp for ${md} kg/s at ${ve} m/s exhaust velocity`,
      p: `An engine expels ${md} kg/s of propellant at an effective exhaust velocity of ${ve} m/s. Compute the thrust and specific impulse.`,
      d: 1, tp: "propulsion",
      i: `Thrust F = ṁ·ve = ${md}·${ve} = ${f(F)} N (${f(F / 1000)} kN). Isp = ve/g0 = ${ve}/9.80665 = ${f(ve / G0)} s. Isp measures thrust per unit weight flow of propellant, so it is the efficiency measure for the propellant used.`,
      c: ["Thrust F = ṁ·ve for effective exhaust velocity", `Thrust of about ${f(F)} N`, `Isp = ve/g0 of about ${f(ve / G0)} s`, "Isp measures propellant efficiency"],
      k: ["Thrust and Isp are different: one is force, one is efficiency", "High-Isp low-thrust systems suit in-space transfers, not launch"],
    }));
  }

  for (const [h, ld] of [[3000, 15], [10000, 17], [12000, 18], [1500, 10], [2000, 40], [7000, 12]]) {
    const R = (h * ld) / 1000;
    out.push(drill({
      t: `Still-air glide range from ${h} m at L/D ${ld}`,
      p: `An aircraft loses power at ${h} m altitude and glides at best L/D of ${ld} in still air. How far can it glide, and how does a 20 knot headwind change this qualitatively?`,
      d: 1, tp: "flight-dynamics", tp2: "aerodynamics",
      i: `In still air glide distance = altitude × L/D = ${h}·${ld} = ${f(R)} km. A headwind lowers ground speed without changing sink rate, so the ground distance shrinks, and a tailwind extends it. Best glide speed gives the maximum L/D.`,
      c: ["Glide range = altitude × lift-to-drag ratio", `Range of about ${f(R)} km`, "A headwind reduces ground distance and a tailwind increases it", "Best glide occurs at maximum L/D"],
      k: ["Glide ratio is geometric: horizontal distance per unit altitude lost", "Wind changes ground speed but not the air-relative glide angle"],
    }));
  }

  for (const [name, mu, R] of [["Earth", 398600, 6378], ["the Moon", 4902.8, 1737], ["Mars", 42828, 3390], ["Jupiter", 1.2669e8, 71492], ["Venus", 324859, 6052], ["Mercury", 22032, 2440]] as [string, number, number][]) {
    const v = Math.sqrt((2 * mu) / R);
    out.push(drill({
      t: `Escape velocity from the surface of ${name}`,
      p: `Using μ = ${f(mu)} km³/s² and radius ${R} km for ${name}, compute the escape velocity at the surface and the circular orbit speed there. What is the ratio between them?`,
      d: 2, tp: "orbital-mechanics",
      i: `Escape speed = √(2μ/R) = ${f(v)} km/s. Circular speed at the surface = √(μ/R) = ${f(v / Math.SQRT2)} km/s. The ratio is always √2 ≈ 1.414, so a spacecraft in low circular orbit needs about a 41 percent speed increase to escape.`,
      c: ["Escape velocity v = √(2μ/R)", `Escape speed of about ${f(v)} km/s`, `Circular speed of about ${f(v / Math.SQRT2)} km/s`, "Ratio of escape to circular speed is √2"],
      k: ["Escape energy makes total specific orbital energy zero", "The √2 ratio holds for any body"],
    }));
  }

  for (const [W, S, CLm, rho] of [[10, 16, 1.6, 1.225], [60, 30, 1.8, 1.225], [250, 100, 2.2, 1.225], [8, 12, 1.4, 1.225], [35, 22, 1.5, 1.0], [800, 360, 2.4, 1.225]]) {
    const V = Math.sqrt((2 * W * 1000) / (rho * S * CLm));
    out.push(drill({
      t: `Stall speed of a ${W} kN aircraft with ${S} m² wing and CLmax ${CLm}`,
      p: `An aircraft weighing ${W} kN has wing area ${S} m² and maximum lift coefficient ${CLm} at air density ${rho} kg/m³. Compute the 1g stall speed, and the stall speed in a 60 degree banked level turn.`,
      d: 2, tp: "flight-dynamics", tp2: "aerodynamics",
      i: `Vs = √(2W/(ρ·S·CLmax)) = √(2·${W * 1000}/(${rho}·${S}·${CLm})) = ${f(V)} m/s (${f(V * 1.944)} knots). In a 60 degree bank the load factor is n = 1/cos60° = 2, so the stall speed rises by √2 to ${f(V * Math.SQRT2)} m/s.`,
      c: ["Stall speed Vs = √(2W/(ρ S CLmax))", `1g stall speed of about ${f(V)} m/s`, "Load factor n = 1/cosφ in a level turn", `Banked stall speed of about ${f(V * Math.SQRT2)} m/s`],
      k: ["Stall speed rises with the square root of load factor", "Flaps raise CLmax and lower stall speed"],
    }));
  }
  return out;
}
