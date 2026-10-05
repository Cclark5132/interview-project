import type { Q } from "./types";
import { environmental1 } from "./parts/environmental-1";
import { environmental2 } from "./parts/environmental-2";

export const environmental: Q[] = [...environmental1, ...environmental2];
