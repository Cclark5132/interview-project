import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";

// Integration tests run against a throwaway SQLite file created from the real migrations.
export default function setup() {
  const file = path.resolve(__dirname, "..", "test.db");
  for (const f of [file, `${file}-journal`]) rmSync(f, { force: true });
  process.env.DATABASE_URL = `file:${file.replace(/\\/g, "/")}`;
  execSync("npx prisma migrate deploy", { stdio: "pipe", env: process.env, cwd: path.resolve(__dirname, "..") });
  return () => {
    for (const f of [file, `${file}-journal`]) rmSync(f, { force: true });
  };
}
