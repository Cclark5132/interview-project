import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";

// Integration tests run against a throwaway embedded Postgres built from the real migrations.
export default async function setup() {
  const dir = mkdtempSync(path.join(tmpdir(), "ip-test-pg-"));
  const port = 54000 + Math.floor(Math.random() * 900);
  const pg = new EmbeddedPostgres({ databaseDir: dir, user: "postgres", password: "postgres", port, persistent: false, initdbFlags: ["--encoding=UTF8", "--locale=C"], onLog: () => {}, onError: () => {} });
  await pg.initialise();
  await pg.start();
  await pg.createDatabase("test");
  const url = `postgresql://postgres:postgres@localhost:${port}/test`;
  process.env.DATABASE_URL = url;
  process.env.DIRECT_URL = url;
  execSync("npx prisma migrate deploy", { stdio: "pipe", env: process.env, cwd: path.resolve(__dirname, "..") });
  return async () => {
    await pg.stop();
    rmSync(dir, { recursive: true, force: true });
  };
}
