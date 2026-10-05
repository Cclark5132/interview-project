import type { Q } from "./types";
import { drill, f, log2 } from "./util";

// ---------- Electrical ----------
export function electricalDrills(): Q[] {
  const out: Q[] = [];

  for (const [R, Cn] of [[1000, 100], [10000, 10], [4700, 1000], [220, 470], [47000, 2.2], [1000, 10]]) {
    const fc = 1 / (2 * Math.PI * R * Cn * 1e-9);
    out.push(drill({
      t: `Cutoff frequency of an RC filter with ${R} Ω and ${Cn} nF`,
      p: `A first-order RC low-pass filter uses R = ${R} Ω and C = ${Cn} nF. Find the −3 dB cutoff frequency, and the gain magnitude at ten times that frequency.`,
      d: 1, tp: "circuit-analysis", tp2: "signals-systems",
      i: `fc = 1/(2πRC) = 1/(2π·${R}·${Cn}e-9) = ${f(fc)} Hz. At 10·fc the magnitude is 1/√(1+10²) = 0.0995, about −20 dB. A first-order filter rolls off at 20 dB per decade, with 45 degrees of phase lag at fc.`,
      c: ["Cutoff frequency fc = 1/(2πRC)", `fc of about ${f(fc)} Hz`, "Gain at 10·fc is about 0.1 or −20 dB", "First-order roll-off of 20 dB per decade with 45 degree lag at fc"],
      k: ["The −3 dB point is where resistance equals capacitive reactance", "Cascading stages sharpens roll-off but loads the earlier stage"],
    }));
  }

  for (const [Vin, R1, R2] of [[12, 10, 10], [5, 4.7, 10], [24, 22, 3.3], [3.3, 10, 22], [48, 100, 10], [9, 1, 2]]) {
    const Vout = (Vin * R2) / (R1 + R2);
    const I = Vin / ((R1 + R2) * 1000);
    out.push(drill({
      t: `Voltage divider: ${Vin} V across ${R1} kΩ and ${R2} kΩ`,
      p: `A ${Vin} V source drives a divider with R1 = ${R1} kΩ on top and R2 = ${R2} kΩ on the bottom. Find the unloaded output, the divider current, and explain what a load much smaller than R2 does.`,
      d: 1, tp: "circuit-analysis",
      i: `Vout = Vin·R2/(R1+R2) = ${Vin}·${R2}/(${R1}+${R2}) = ${f(Vout)} V. Current I = Vin/(R1+R2) = ${f(I * 1000)} mA. A load much smaller than R2 sits in parallel with it, lowering the lower resistance and pulling Vout down, so the load should be at least ten times R2 or the divider buffered.`,
      c: ["Divider equation Vout = Vin·R2/(R1+R2)", `Output of about ${f(Vout)} V`, `Divider current of about ${f(I * 1000)} mA`, "Loading effect: a heavy load in parallel with R2 lowers the output"],
      k: ["Divider accuracy needs a load much larger than the lower resistor", "Lower resistor values waste power but tolerate loading better"],
    }));
  }

  for (const [V, I, pf] of [[230, 10, 0.8], [120, 15, 0.9], [400, 25, 0.7], [230, 4, 0.95], [480, 60, 0.85], [120, 8, 0.6]]) {
    const S = V * I;
    const P = S * pf;
    const Q = S * Math.sqrt(1 - pf * pf);
    out.push(drill({
      t: `AC power triangle at ${V} V, ${I} A and power factor ${pf}`,
      p: `A single-phase load draws ${I} A rms from ${V} V rms at a lagging power factor of ${pf}. Find the apparent, real and reactive power and say why utilities care about low power factor.`,
      d: 2, tp: "power-systems", tp2: "circuit-analysis",
      i: `S = VI = ${f(S)} VA. P = S·pf = ${f(P)} W. Q = S·sinφ = ${f(Q)} var. Low power factor means more current for the same real power, causing extra I²R loss and larger conductors and transformers, so utilities penalise it and customers add capacitors.`,
      c: ["Apparent power S = V·I", `Real power of about ${f(P)} W`, `Reactive power of about ${f(Q)} var`, "Low power factor raises current and I²R losses for the same real power"],
      k: ["Real, reactive and apparent power form a right triangle", "Capacitors correct lagging power factor from inductive loads"],
    }));
  }

  for (const [Rf, Rin, Vin, gbw] of [[100, 10, 0.2, 1], [47, 4.7, 0.5, 10], [220, 10, 0.1, 1], [22, 2.2, 0.25, 5], [10, 1, 0.3, 0.5], [150, 15, 0.4, 2]]) {
    const A = -Rf / Rin;
    const bw = (gbw * 1e6) / (1 + Rf / Rin);
    out.push(drill({
      t: `Inverting amplifier with Rf ${Rf} kΩ, Rin ${Rin} kΩ and a ${gbw} MHz op-amp`,
      p: `An ideal-feedback inverting op-amp stage uses Rf = ${Rf} kΩ and Rin = ${Rin} kΩ with an op-amp of ${gbw} MHz gain-bandwidth product. Find the gain, the output for a ${Vin} V input, and the closed-loop bandwidth.`,
      d: 2, tp: "analog-electronics", tp2: "circuit-analysis",
      i: `Gain = −Rf/Rin = ${f(A)}. Output = ${f(A * Vin)} V (check it stays within the supply rails). Closed-loop bandwidth ≈ GBW/(1+Rf/Rin) = ${gbw}e6/${f(1 + Rf / Rin)} = ${f(bw / 1000)} kHz. Higher gain trades away bandwidth.`,
      c: ["Inverting gain −Rf/Rin", `Gain of ${f(A)} and output of ${f(A * Vin)} V`, `Bandwidth of about ${f(bw / 1000)} kHz from GBW divided by noise gain`, "Output must remain inside the supply rails"],
      k: ["The gain-bandwidth product is roughly constant for a voltage-feedback op-amp", "Noise gain is 1 + Rf/Rin even for the inverting configuration"],
    }));
  }

  for (const [Vin, Vout, L, fs] of [[12, 5, 22, 500], [24, 3.3, 10, 1000], [48, 12, 47, 200], [9, 1.8, 4.7, 2000], [19, 5, 33, 400], [12, 3.3, 15, 800]]) {
    const D = Vout / Vin;
    const dI = ((Vin - Vout) * D) / (L * 1e-6 * fs * 1e3);
    out.push(drill({
      t: `Buck converter ${Vin} V to ${Vout} V with ${L} µH at ${fs} kHz`,
      p: `A continuous-conduction buck converter steps ${Vin} V down to ${Vout} V using a ${L} µH inductor at ${fs} kHz switching frequency. Find the duty cycle and the peak-to-peak inductor ripple current.`,
      d: 2, tp: "power-electronics",
      i: `Duty cycle D = Vout/Vin = ${f(D)}. Ripple ΔIL = (Vin − Vout)·D/(L·fsw) = (${Vin} − ${Vout})·${f(D)}/(${L}e-6·${fs}e3) = ${f(dI)} A peak to peak. Raising L or fsw reduces ripple but increases size or switching loss.`,
      c: ["Ideal CCM duty cycle D = Vout/Vin", `Duty cycle of about ${f(D)}`, `Ripple current of about ${f(dI)} A peak to peak`, "Trade-off: larger L or higher fsw cuts ripple but costs size or switching loss"],
      k: ["Ripple current sets inductor peak current and core saturation margin", "Light load can push the converter into discontinuous mode"],
    }));
  }

  for (const [Lu, Cn] of [[100, 10], [10, 100], [1000, 1], [4.7, 470], [22, 22], [330, 2.2]]) {
    const f0 = 1 / (2 * Math.PI * Math.sqrt(Lu * 1e-6 * Cn * 1e-9));
    out.push(drill({
      t: `Resonant frequency of ${Lu} µH with ${Cn} nF`,
      p: `A series LC circuit has L = ${Lu} µH and C = ${Cn} nF. Find the resonant frequency and describe the impedance at resonance for a series and a parallel arrangement.`,
      d: 1, tp: "circuit-analysis", tp2: "electromagnetics",
      i: `f0 = 1/(2π√(LC)) = 1/(2π√(${Lu}e-6·${Cn}e-9)) = ${f(f0)} Hz. At resonance a series LC has minimum impedance (just the resistance) and a parallel LC has maximum impedance, which is why series resonators pass and parallel ones block a band.`,
      c: ["Resonance f0 = 1/(2π√(LC))", `f0 of about ${f(f0)} Hz`, "Series LC has minimum impedance at resonance", "Parallel LC has maximum impedance at resonance"],
      k: ["At resonance inductive and capacitive reactances cancel", "Resistance sets the quality factor and bandwidth"],
    }));
  }

  for (const [VLL, I, pf] of [[400, 50, 0.85], [480, 100, 0.9], [208, 30, 0.8], [11000, 200, 0.92], [690, 150, 0.88], [380, 12, 0.75]]) {
    const P = Math.sqrt(3) * VLL * I * pf;
    out.push(drill({
      t: `Three-phase real power at ${VLL} V line-to-line, ${I} A, pf ${pf}`,
      p: `A balanced three-phase load draws ${I} A per line at ${VLL} V line-to-line with power factor ${pf}. Find the real power and the phase voltage of a wye connection.`,
      d: 2, tp: "power-systems",
      i: `P = √3·VLL·IL·pf = 1.732·${VLL}·${I}·${pf} = ${f(P / 1000)} kW. For a wye connection the phase voltage is VLL/√3 = ${f(VLL / Math.sqrt(3))} V. Balanced three-phase delivers constant instantaneous power, which is one reason it is used for transmission and motors.`,
      c: ["Three-phase power P = √3·VLL·IL·pf", `Real power of about ${f(P / 1000)} kW`, `Wye phase voltage of about ${f(VLL / Math.sqrt(3))} V`, "Balanced three-phase gives constant instantaneous power"],
      k: ["Line and phase quantities differ by √3 or by connection type", "Three-phase uses less conductor material per kW than single-phase"],
    }));
  }

  for (const [Vp, Np, Ns, Rl] of [[230, 1000, 100, 5], [120, 500, 2000, 1000], [11000, 2000, 40, 2], [240, 200, 50, 3], [400, 800, 120, 2], [13800, 1000, 24, 0.2]]) {
    const Vs = (Vp * Ns) / Np;
    const Is = Vs / Rl;
    const Ip = (Is * Ns) / Np;
    out.push(drill({
      t: `Ideal transformer ${Np}:${Ns} on ${Vp} V into ${Rl} Ω`,
      p: `An ideal transformer has ${Np} primary turns and ${Ns} secondary turns, a ${Vp} V primary and a ${Rl} Ω resistive load. Find the secondary voltage, both currents, and the power delivered.`,
      d: 1, tp: "power-systems", tp2: "electromagnetics",
      i: `Vs = Vp·Ns/Np = ${f(Vs)} V. Is = Vs/R = ${f(Is)} A. Ip = Is·Ns/Np = ${f(Ip)} A. Power = Vs·Is = ${f(Vs * Is)} W on both sides in the ideal case. Real transformers lose a few percent to copper and core loss.`,
      c: ["Voltage ratio equals turns ratio", `Secondary voltage of about ${f(Vs)} V`, `Secondary current of ${f(Is)} A and primary current of ${f(Ip)} A`, "Ideal power in equals power out"],
      k: ["Current scales inversely with voltage so power is conserved", "Core and copper losses make real efficiency below 100 percent"],
    }));
  }

  for (const [V, Rk, Cu, tms] of [[5, 10, 1, 20], [12, 4.7, 10, 100], [3.3, 100, 0.1, 5], [9, 1, 100, 150], [24, 22, 4.7, 200], [5, 47, 0.47, 30]]) {
    const tau = Rk * 1e3 * Cu * 1e-6;
    const v = V * (1 - Math.exp(-(tms / 1000) / tau));
    out.push(drill({
      t: `RC charging: ${V} V through ${Rk} kΩ into ${Cu} µF`,
      p: `A capacitor of ${Cu} µF charges from 0 V through ${Rk} kΩ from a ${V} V supply. Find the time constant and the capacitor voltage after ${tms} ms.`,
      d: 1, tp: "circuit-analysis",
      i: `τ = RC = ${Rk}e3·${Cu}e-6 = ${f(tau * 1000)} ms. v(t) = V(1 − e^(−t/τ)) = ${V}(1 − e^(−${tms}/${f(tau * 1000)})) = ${f(v)} V. After about 5τ the capacitor is above 99 percent charged.`,
      c: ["Time constant τ = RC", `τ of about ${f(tau * 1000)} ms`, `Voltage after ${tms} ms of about ${f(v)} V`, "About 63 percent after one τ and over 99 percent after 5τ"],
      k: ["Charging current falls exponentially as the voltage across R shrinks", "The same math governs RC filters and debounce circuits"],
    }));
  }

  for (const [a, b, c, V] of [[100, 220, 330, 12], [47, 47, 47, 9], [1000, 2200, 4700, 5], [10, 15, 30, 24], [68, 100, 150, 3.3], [330, 330, 1000, 48]]) {
    const Req = 1 / (1 / a + 1 / b + 1 / c);
    const It = V / Req;
    out.push(drill({
      t: `Parallel resistors ${a}, ${b} and ${c} Ω across ${V} V`,
      p: `Three resistors of ${a} Ω, ${b} Ω and ${c} Ω are connected in parallel across a ${V} V source. Find the equivalent resistance, total current, and the power in the smallest resistor.`,
      d: 1, tp: "circuit-analysis",
      i: `1/Req = 1/${a} + 1/${b} + 1/${c}, so Req = ${f(Req)} Ω. Total current = ${V}/${f(Req)} = ${f(It)} A. The smallest resistor (${Math.min(a, b, c)} Ω) dissipates V²/R = ${f((V * V) / Math.min(a, b, c))} W. The equivalent is always below the smallest branch.`,
      c: ["Parallel formula 1/Req = Σ1/Ri", `Req of about ${f(Req)} Ω`, `Total current of about ${f(It)} A`, "Equivalent is smaller than the smallest branch resistor"],
      k: ["Each branch sees the full source voltage", "Branch power is V²/R so the smallest resistor dissipates the most"],
    }));
  }
  return out;
}

// ---------- Computer engineering ----------
export function computerEngineeringDrills(): Q[] {
  const out: Q[] = [];

  for (const [hit, mr, pen] of [[1, 5, 100], [2, 2, 80], [0.5, 10, 60], [1.2, 3, 120], [2, 8, 50], [1, 1, 200]]) {
    const amat = hit + (mr / 100) * pen;
    out.push(drill({
      t: `AMAT with ${hit} ns hit time, ${mr}% miss rate and ${pen} ns penalty`,
      p: `A cache has a ${hit} ns hit time, a ${mr} percent miss rate and a ${pen} ns miss penalty. Compute the average memory access time and say which parameter gives the biggest improvement per unit change.`,
      d: 2, tp: "memory-systems", tp2: "computer-architecture",
      i: `AMAT = hit time + miss rate × miss penalty = ${hit} + ${mr / 100}·${pen} = ${f(amat)} ns. The miss term contributes ${f((mr / 100) * pen)} ns, so cutting the miss rate or penalty (larger cache, better prefetching, a faster next level) helps most when that term dominates.`,
      c: ["AMAT = hit time + miss rate × miss penalty", `AMAT of about ${f(amat)} ns`, `Miss component of ${f((mr / 100) * pen)} ns`, "Levers: miss rate, miss penalty or hit time"],
      k: ["Hit time and miss rate trade off as cache size changes", "Multi-level caches reduce the effective miss penalty"],
    }));
  }

  for (const [st, stall] of [[5, 0.2], [5, 0.5], [8, 0.3], [14, 0.6], [10, 0.25], [3, 0.1]]) {
    const cpi = 1 + stall;
    const sp = st / cpi;
    out.push(drill({
      t: `Pipeline speedup for ${st} stages with ${stall} stall cycles per instruction`,
      p: `An ideal ${st}-stage pipeline has CPI 1, but hazards add ${stall} stall cycles per instruction on average. Find the real CPI and the speedup over an unpipelined machine with equal total logic delay (ignore latch overhead).`,
      d: 2, tp: "computer-architecture",
      i: `CPI = 1 + ${stall} = ${f(cpi)}. Ideal speedup equals the stage count (${st}). With stalls, speedup = ${st}/${f(cpi)} = ${f(sp)}. Forwarding, branch prediction and scheduling reduce stalls.`,
      c: ["Pipelined CPI = ideal CPI + stall cycles", `CPI of ${f(cpi)}`, `Speedup of about ${f(sp)}`, "Mitigations such as forwarding and branch prediction"],
      k: ["Deeper pipelines raise clock rate but make stalls and flushes costlier", "Hazards are structural, data or control"],
    }));
  }

  for (const [kb, blk, as, ab] of [[32, 64, 4, 32], [16, 32, 2, 32], [64, 64, 8, 40], [8, 16, 1, 32], [256, 64, 16, 48], [4, 32, 1, 24]]) {
    const sets = (kb * 1024) / (blk * as);
    const off = log2(blk);
    const idx = log2(sets);
    const tag = ab - off - idx;
    out.push(drill({
      t: `Address breakdown for a ${kb} KB, ${as}-way cache with ${blk} B blocks (${ab}-bit addresses)`,
      p: `A ${kb} KB ${as}-way set-associative cache uses ${blk}-byte blocks and ${ab}-bit physical addresses. Find the number of sets and the sizes of the offset, index and tag fields.`,
      d: 2, tp: "memory-systems", tp2: "computer-architecture",
      i: `Sets = cache size/(block size × associativity) = ${kb * 1024}/(${blk}·${as}) = ${sets}. Offset bits = log2(${blk}) = ${off}. Index bits = log2(${sets}) = ${idx}. Tag bits = ${ab} − ${idx} − ${off} = ${tag}.`,
      c: ["Number of sets = size / (block × ways)", `${sets} sets`, `Offset ${off} bits, index ${idx} bits`, `Tag of ${tag} bits`],
      k: ["Higher associativity shrinks the index and grows the tag", "Direct-mapped is the one-way special case"],
    }));
  }

  for (const [Vref, N] of [[3.3, 12], [5, 10], [2.5, 16], [1.8, 8], [3.3, 14], [5, 12]]) {
    const lsb = Vref / 2 ** N;
    const code = Math.floor((0.3 * Vref) / lsb);
    out.push(drill({
      t: `Resolution of a ${N}-bit ADC with ${Vref} V reference`,
      p: `An ideal ${N}-bit ADC has a ${Vref} V reference. Find the LSB size, the maximum quantisation error, and the output code for a ${f(0.3 * Vref)} V input.`,
      d: 1, tp: "embedded-systems", tp2: "signals-systems",
      i: `LSB = Vref/2^N = ${Vref}/${2 ** N} = ${f(lsb * 1000)} mV. Quantisation error is up to ±LSB/2 = ±${f((lsb * 1000) / 2)} mV. The code for ${f(0.3 * Vref)} V is floor(${f(0.3 * Vref)}/${f(lsb, 4)}) = ${code}. Real converters add offset, gain and noise errors.`,
      c: ["LSB = Vref / 2^N", `LSB of about ${f(lsb * 1000)} mV`, "Quantisation error of ±½ LSB", `Output code of about ${code}`],
      k: ["More bits shrink the LSB but noise sets the effective resolution", "Reference accuracy limits absolute accuracy"],
    }));
  }

  for (const [C, V, fm, a] of [[100, 1.0, 2000, 0.15], [20, 1.8, 500, 0.3], [500, 0.9, 3000, 0.1], [5, 3.3, 48, 0.5], [1000, 1.1, 2500, 0.2], [30, 5, 16, 0.4]]) {
    const P = a * C * 1e-12 * V * V * fm * 1e6;
    out.push(drill({
      t: `CMOS dynamic power: ${C} pF at ${V} V and ${fm} MHz, activity ${a}`,
      p: `A block has ${C} pF of switched capacitance, activity factor ${a}, supply ${V} V and clock ${fm} MHz. Compute the dynamic power, and the saving if both voltage and frequency are scaled down by 20 percent.`,
      d: 2, tp: "vlsi", tp2: "computer-architecture",
      i: `P = α·C·V²·f = ${a}·${C}e-12·${V}²·${fm}e6 = ${f(P * 1000)} mW. Scaling V and f by 0.8 gives 0.8³ = 0.512 of the power, a 49 percent saving, which is why DVFS is effective. Leakage power is separate.`,
      c: ["Dynamic power P = αCV²f", `Power of about ${f(P * 1000)} mW`, "Voltage and frequency scaling by 0.8 gives power × 0.512", "Static leakage is additional"],
      k: ["Power depends on the square of voltage", "Lower voltage also lowers the maximum clock frequency"],
    }));
  }

  for (const [T, tcq, tl, tsu, tsk] of [[10, 0.5, 8.2, 0.3, 0.4], [5, 0.4, 4.1, 0.2, 0.3], [2, 0.3, 1.2, 0.15, 0.1], [20, 1, 17, 0.5, 0.8], [4, 0.35, 3.5, 0.2, 0.2], [8, 0.5, 6.8, 0.3, 0.3]]) {
    const slack = T - tcq - tl - tsu - tsk;
    out.push(drill({
      t: `Setup slack with a ${T} ns clock and ${tl} ns of logic`,
      p: `A path has clk-to-Q ${tcq} ns, combinational delay ${tl} ns, setup time ${tsu} ns and ${tsk} ns of clock skew penalty, with a ${T} ns clock period. Compute the setup slack, state whether it meets timing, and give the maximum clock frequency for this path.`,
      d: 2, tp: "digital-design", tp2: "vlsi",
      i: `Slack = T − (tcq + tlogic + tsu + tskew) = ${T} − ${f(tcq + tl + tsu + tsk)} = ${f(slack)} ns. ${slack >= 0 ? "Positive slack: timing is met" : "Negative slack: setup is violated"}. Minimum period = ${f(T - slack)} ns, so fmax = ${f(1000 / (T - slack))} MHz.`,
      c: ["Setup slack = period − (clk-to-Q + logic + setup + skew)", `Slack of about ${f(slack)} ns`, `Verdict: ${slack >= 0 ? "meets" : "fails"} timing`, `fmax of about ${f(1000 / (T - slack))} MHz`],
      k: ["Setup violations are fixed by shortening logic or slowing the clock", "Hold violations do not depend on clock period"],
    }));
  }

  for (const [bytes, baud] of [[64, 9600], [256, 115200], [1024, 57600], [16, 19200], [4096, 921600], [100, 38400]]) {
    const t = ((bytes * 10) / baud) * 1000;
    out.push(drill({
      t: `UART transfer time for ${bytes} bytes at ${baud} baud (8N1)`,
      p: `How long does a UART at ${baud} baud take to send ${bytes} bytes using 8 data bits, no parity and 1 stop bit? What is the effective data rate in bytes per second?`,
      d: 1, tp: "interfaces-protocols", tp2: "embedded-systems",
      i: `8N1 frames are 10 bits per byte (start, 8 data, stop). Time = ${bytes}·10/${baud} = ${f(t)} ms. Effective throughput = ${baud}/10 = ${baud / 10} bytes/s, so 20 percent of the line rate is framing overhead.`,
      c: ["8N1 uses 10 bits per byte on the wire", `Transfer time of about ${f(t)} ms`, `Throughput of ${baud / 10} bytes per second`, "Framing overhead is 20 percent"],
      k: ["Baud equals bits per second for binary signalling", "Both ends must agree on baud within a few percent"],
    }));
  }

  for (const [clk, n] of [[100, 6], [400, 32], [1000, 16], [100, 2], [400, 128], [3400, 64]]) {
    const clocks = (n + 1) * 9 + 2;
    const t = (clocks / clk);
    out.push(drill({
      t: `I²C write of ${n} bytes at ${clk} kHz`,
      p: `A controller writes ${n} data bytes to an I²C device at ${clk} kHz. Count the clock cycles (address byte plus data bytes at 9 clocks each, plus start and stop) and estimate the transaction time.`,
      d: 2, tp: "interfaces-protocols",
      i: `Each byte takes 9 clocks (8 bits plus ACK). Bytes on the bus = address + ${n} data = ${n + 1}, so ${(n + 1) * 9} clocks plus roughly 2 for start and stop, about ${clocks}. Time = ${clocks}/${clk} kHz = ${f(t)} ms. Clock stretching and pull-up rise times can add to this.`,
      c: ["Each I²C byte uses 9 clocks including the ACK", `About ${clocks} clocks in total`, `Transaction time of about ${f(t)} ms`, "Address byte, start and stop add overhead"],
      k: ["Open-drain buses rely on pull-up resistors, limiting speed", "Clock stretching lets slow devices delay the master"],
    }));
  }

  for (const [p, n] of [[0.9, 8], [0.95, 16], [0.5, 100], [0.99, 64], [0.8, 4], [0.75, 1000]]) {
    const s = 1 / (1 - p + p / n);
    out.push(drill({
      t: `Amdahl speedup with ${p * 100}% parallel code on ${n} cores`,
      p: `${p * 100} percent of a program's runtime can be parallelised perfectly across ${n} processors. Compute the speedup and the limit as the processor count goes to infinity.`,
      d: 2, tp: "computer-architecture",
      i: `Speedup = 1/((1−p) + p/n) = 1/(${f(1 - p)} + ${p}/${n}) = ${f(s)}. The limit is 1/(1−p) = ${f(1 / (1 - p))}. The serial fraction caps the benefit of adding cores.`,
      c: ["Amdahl's law speedup = 1/((1−p) + p/n)", `Speedup of about ${f(s)}`, `Upper limit of ${f(1 / (1 - p))}`, "Serial fraction limits scaling"],
      k: ["Diminishing returns from extra cores", "Real programs also pay synchronisation and communication costs"],
    }));
  }

  for (const [bits, val] of [[8, -45], [8, -1], [16, -1234], [12, -100], [16, -32768], [10, -300]]) {
    const hex = ((1 << bits) + val).toString(16).toUpperCase().padStart(Math.ceil(bits / 4), "0");
    out.push(drill({
      t: `Two's complement of ${val} in ${bits} bits`,
      p: `Represent ${val} as a ${bits}-bit two's complement number in hexadecimal, and give the range of values representable in ${bits} bits.`,
      d: 1, tp: "digital-design", tp2: "computer-architecture",
      i: `Two's complement of ${val} in ${bits} bits is 2^${bits} + (${val}) = ${(1 << bits) + val} = 0x${hex}. Range is −2^${bits - 1} to 2^${bits - 1} − 1, i.e. ${-(2 ** (bits - 1))} to ${2 ** (bits - 1) - 1}. Method: invert the bits of the magnitude and add one.`,
      c: ["Negative value encoded as 2^N plus the value", `Hex representation 0x${hex}`, `Range −${2 ** (bits - 1)} to ${2 ** (bits - 1) - 1}`, "Invert the bits and add one"],
      k: ["One representation of zero and a single adder for signed and unsigned", "The most negative value has no positive counterpart"],
    }));
  }
  return out;
}

// ---------- Civil ----------
export function civilDrills(): Q[] {
  const out: Q[] = [];

  for (const [w, L, S] of [[10, 6, 500], [25, 8, 2000], [5, 4, 150], [40, 10, 3500], [15, 5, 600], [8, 7, 800]]) {
    const M = (w * L * L) / 8;
    const sg = (M * 1e6) / (S * 1e3);
    out.push(drill({
      t: `Maximum moment and bending stress: ${w} kN/m over ${L} m, S = ${S} cm³`,
      p: `A simply supported beam spans ${L} m under a uniform load of ${w} kN/m and has an elastic section modulus of ${S} cm³. Find the maximum bending moment, the maximum bending stress, and compare it with a 250 MPa yield steel.`,
      d: 1, tp: "structural-analysis", tp2: "structural-design",
      i: `Mmax = wL²/8 = ${w}·${L}²/8 = ${f(M)} kN·m at midspan. σ = M/S = ${f(M)}e6 N·mm / ${S}e3 mm³ = ${f(sg)} MPa. Against 250 MPa yield the utilisation is ${f((sg / 250) * 100)} percent before applying load and resistance factors.`,
      c: ["Maximum moment wL²/8 at midspan", `Mmax of about ${f(M)} kN·m`, `Bending stress σ = M/S of about ${f(sg)} MPa`, "Comparison with yield or design strength"],
      k: ["Stress is moment divided by section modulus", "Design codes apply load and resistance factors on top of this elastic check"],
    }));
  }

  for (const [P, L] of [[50, 6], [120, 8], [20, 4], [200, 10], [80, 5], [35, 7.5]]) {
    out.push(drill({
      t: `Reactions and moment for a ${P} kN midspan point load on a ${L} m beam`,
      p: `A simply supported ${L} m beam carries a ${P} kN point load at midspan. Find the support reactions, the maximum moment, and the maximum shear.`,
      d: 1, tp: "structural-analysis",
      i: `By symmetry each reaction is P/2 = ${P / 2} kN. Maximum moment at midspan = PL/4 = ${f((P * L) / 4)} kN·m. Maximum shear = P/2 = ${P / 2} kN on each side of the load, changing sign at the load point.`,
      c: ["Symmetry gives reactions of P/2", `Reactions of ${P / 2} kN`, `Maximum moment PL/4 of ${f((P * L) / 4)} kN·m`, "Shear of P/2 changing sign at the load"],
      k: ["The moment diagram peaks where shear crosses zero", "Equilibrium of forces and moments gives the reactions"],
    }));
  }

  for (const [E, I, L, K] of [[200, 2000, 4, 1], [200, 800, 3, 2], [70, 1500, 5, 0.7], [200, 5000, 6, 1], [12, 8000, 3.5, 1], [200, 300, 2.5, 0.5]]) {
    const Pcr = (Math.PI ** 2 * E * 1e9 * I * 1e-8) / (K * L) ** 2 / 1000;
    out.push(drill({
      t: `Euler buckling load: E ${E} GPa, I ${I} cm⁴, L ${L} m, K ${K}`,
      p: `A column has E = ${E} GPa, I = ${I} cm⁴ about the weak axis, length ${L} m and effective length factor K = ${K}. Compute the Euler critical load and explain what the K factor represents.`,
      d: 2, tp: "structural-analysis", tp2: "structural-design",
      i: `Pcr = π²EI/(KL)² = π²·${E}e9·${I}e-8/(${K}·${L})² = ${f(Pcr)} kN. K accounts for end conditions: 1.0 pinned-pinned, 0.5 fixed-fixed, 2.0 fixed-free. Euler's formula applies to slender columns; short columns fail by crushing or yielding first.`,
      c: ["Euler critical load Pcr = π²EI/(KL)²", `Pcr of about ${f(Pcr)} kN`, "K reflects end restraint, such as 0.5 fixed-fixed and 2.0 fixed-free", "Only valid for slender columns that buckle elastically"],
      k: ["Buckling load scales with the inverse square of effective length", "The weak axis governs"],
    }));
  }

  for (const [b, y, S, n] of [[3, 1, 0.001, 0.013], [2, 0.8, 0.002, 0.015], [5, 1.5, 0.0005, 0.025], [1.5, 0.5, 0.004, 0.012], [4, 1.2, 0.001, 0.035], [6, 2, 0.0008, 0.03]]) {
    const A = b * y;
    const R = A / (b + 2 * y);
    const V = (1 / n) * R ** (2 / 3) * Math.sqrt(S);
    out.push(drill({
      t: `Manning flow in a ${b} m wide channel at ${y} m depth (n ${n}, slope ${S})`,
      p: `A rectangular channel ${b} m wide flows ${y} m deep on a slope of ${S} with Manning's n = ${n}. Find the hydraulic radius, velocity and discharge.`,
      d: 2, tp: "hydraulics-hydrology",
      i: `A = by = ${f(A)} m². Wetted perimeter P = b + 2y = ${f(b + 2 * y)} m, so R = A/P = ${f(R)} m. V = (1/n)R^(2/3)S^(1/2) = ${f(V)} m/s. Q = VA = ${f(V * A)} m³/s.`,
      c: ["Manning equation V = (1/n)R^(2/3)S^(1/2)", `Hydraulic radius of ${f(R)} m`, `Velocity of about ${f(V)} m/s`, `Discharge of about ${f(V * A)} m³/s`],
      k: ["Hydraulic radius is area over wetted perimeter", "Rougher channels, with larger n, carry less flow"],
    }));
  }

  for (const [C, i, A] of [[0.8, 60, 10], [0.35, 90, 25], [0.6, 45, 4], [0.9, 120, 2], [0.25, 70, 50], [0.7, 100, 8]]) {
    const Q = (C * i * A) / 360;
    out.push(drill({
      t: `Rational method peak runoff for C ${C}, ${i} mm/h over ${A} ha`,
      p: `A ${A} ha catchment has runoff coefficient ${C} and a design rainfall intensity of ${i} mm/h for the time of concentration. Use the rational method to find the peak discharge, and state its main limitation.`,
      d: 1, tp: "hydraulics-hydrology",
      i: `Q = C·i·A/360 with i in mm/h and A in hectares gives m³/s: Q = ${C}·${i}·${A}/360 = ${f(Q)} m³/s. The method assumes uniform rainfall over the catchment lasting at least the time of concentration, so it suits small catchments only.`,
      c: ["Rational method Q = CiA", `Peak flow of about ${f(Q)} m³/s`, "Units: mm/h and hectares with the 1/360 factor", "Valid mainly for small catchments"],
      k: ["Runoff coefficient reflects imperviousness and slope", "Intensity is taken for a duration equal to the time of concentration"],
    }));
  }

  for (const [P, B, L, qa] of [[800, 2, 2, 250], [1500, 3, 3, 200], [400, 1.5, 1.5, 180], [2500, 2.5, 4, 300], [600, 2, 3, 120], [3000, 4, 4, 220]]) {
    const q = P / (B * L);
    out.push(drill({
      t: `Footing pressure for ${P} kN on a ${B} × ${L} m footing (allowable ${qa} kPa)`,
      p: `A ${B} m by ${L} m spread footing carries a ${P} kN column load. The allowable bearing pressure is ${qa} kPa. Compute the bearing pressure and say whether the footing is adequate, ignoring footing self-weight.`,
      d: 1, tp: "geotechnical", tp2: "structural-design",
      i: `q = P/A = ${P}/(${B}·${L}) = ${f(q)} kPa. Compared with ${qa} kPa allowable this is ${q <= qa ? "acceptable" : "too high, so the footing must be enlarged"}. Also check settlement and include footing self-weight and any eccentricity.`,
      c: ["Bearing pressure q = P/(B·L)", `q of about ${f(q)} kPa`, `Verdict versus ${qa} kPa allowable`, "Settlement, self-weight and eccentricity still need checking"],
      k: ["Allowable bearing includes a factor of safety against shear failure", "Settlement often governs in clay"],
    }));
  }

  for (const [Fy, Ag] of [[250, 20], [345, 35], [250, 12.5], [350, 50], [250, 8], [345, 28]]) {
    const Pn = (0.9 * Fy * Ag * 100) / 1000;
    out.push(drill({
      t: `Tensile yielding capacity of a ${Ag} cm² member in ${Fy} MPa steel`,
      p: `A steel tension member has gross area ${Ag} cm² and yield strength ${Fy} MPa. Using LRFD with φ = 0.9 for yielding on the gross section, find the design tensile capacity.`,
      d: 2, tp: "structural-design",
      i: `φPn = φ·Fy·Ag = 0.9·${Fy}·${Ag}·100 mm² = ${f(Pn)} kN. Tension members must also be checked for fracture on the net section, with φ = 0.75, so the lower of the two controls.`,
      c: ["LRFD yielding strength φFyAg with φ = 0.9", `Design capacity of about ${f(Pn)} kN`, "Fracture of the net section with φ = 0.75 is also checked", "The smaller capacity governs"],
      k: ["Yielding is ductile and preferred over fracture", "Bolt holes reduce the net area"],
    }));
  }

  for (const [Cc, e0, H, s0, ds] of [[0.3, 0.9, 4, 80, 50], [0.45, 1.2, 6, 60, 40], [0.2, 0.7, 3, 100, 100], [0.35, 1.0, 5, 90, 60], [0.5, 1.4, 8, 70, 30], [0.25, 0.8, 2.5, 50, 75]]) {
    const Sc = ((Cc * H) / (1 + e0)) * Math.log10((s0 + ds) / s0) * 1000;
    out.push(drill({
      t: `Primary consolidation settlement of a ${H} m clay layer (Cc ${Cc}, e0 ${e0})`,
      p: `A normally consolidated clay layer ${H} m thick has Cc = ${Cc} and initial void ratio ${e0}. The mid-layer effective stress is ${s0} kPa and the load adds ${ds} kPa. Estimate the ultimate primary consolidation settlement.`,
      d: 3, tp: "geotechnical",
      i: `Sc = [Cc·H/(1+e0)]·log10((σ'0+Δσ)/σ'0) = [${Cc}·${H}/(1+${e0})]·log10((${s0}+${ds})/${s0}) = ${f(Sc)} mm. The rate depends on drainage path and the coefficient of consolidation, taking months to years in thick clay.`,
      c: ["Consolidation settlement formula with Cc, H, e0 and the stress ratio", `Settlement of about ${f(Sc)} mm`, "Uses effective stress at mid-layer", "Time rate depends on drainage and cv"],
      k: ["Settlement happens as pore pressure dissipates and effective stress rises", "Preloading and wick drains speed up consolidation"],
    }));
  }

  for (const [h, w] of [[2, 3], [4, 2], [1.5, 5], [3, 4], [5, 2.5], [2.5, 1.5]]) {
    const F = (1000 * 9.81 * (h / 2) * h * w) / 1000;
    out.push(drill({
      t: `Hydrostatic force on a ${w} m wide gate retaining ${h} m of water`,
      p: `A vertical rectangular gate ${w} m wide retains ${h} m of fresh water. Find the resultant hydrostatic force and the depth of its line of action.`,
      d: 2, tp: "hydraulics-hydrology", tp2: "fluid-mechanics",
      i: `Force = ρg·h_c·A = 1000·9.81·(${h}/2)·(${h}·${w}) = ${f(F)} kN, where the centroid is at h/2. The centre of pressure lies at 2h/3 = ${f((2 * h) / 3)} m below the surface, below the centroid because pressure increases with depth.`,
      c: ["Force = ρ g h_c A using centroid depth", `Force of about ${f(F)} kN`, `Line of action at 2h/3 = ${f((2 * h) / 3)} m below the surface`, "Centre of pressure lies below the centroid"],
      k: ["Pressure varies linearly with depth", "Force grows with the square of depth for a given width"],
    }));
  }

  for (const [c, wc] of [[350, 0.5], [400, 0.45], [300, 0.6], [450, 0.4], [320, 0.55], [380, 0.48]]) {
    const w = c * wc;
    out.push(drill({
      t: `Water content for ${c} kg/m³ cement at w/c ${wc}`,
      p: `A concrete mix uses ${c} kg of cement per cubic metre and a water-cement ratio of ${wc}. How much water is needed per cubic metre, and how does a higher w/c ratio affect strength and durability?`,
      d: 1, tp: "civil-materials",
      i: `Water = w/c × cement = ${wc}·${c} = ${f(w)} kg/m³, about ${f(w)} litres. A higher w/c ratio leaves more capillary pores after hydration, lowering strength and raising permeability, so durability against freeze-thaw and chloride ingress falls. Workability should be raised with admixtures, not extra water.`,
      c: ["Water mass = w/c × cement mass", `Water of about ${f(w)} kg per m³`, "Higher w/c reduces strength", "Higher w/c raises permeability and hurts durability"],
      k: ["Strength follows the water-cement ratio, not just cement content", "Superplasticisers improve workability at low w/c"],
    }));
  }
  return out;
}
