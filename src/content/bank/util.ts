import type { Q } from "./types";

/** Compact number formatting for worked answers. */
export function f(x: number, sig = 3): string {
  if (!isFinite(x)) return String(x);
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e7 || a < 1e-3) return x.toExponential(sig - 1).replace("e+", "e");
  return String(Number(x.toPrecision(sig)));
}

export const G0 = 9.80665;
export const log2 = (x: number) => Math.log(x) / Math.LN2;

/** Quantitative drill. `i` holds the worked solution; `c` always includes the numeric result. */
export function drill(q: Omit<Q, "m"> & { m?: string[] }): Q {
  return { m: ["Dropping or mixing units", "Quoting a number without checking it is physically reasonable"], ...q };
}
