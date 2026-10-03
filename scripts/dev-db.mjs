// Local development Postgres (no Docker needed). Keeps running until Ctrl-C.
// Connection string: postgresql://postgres:postgres@localhost:5433/interview
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";

const dir = new URL("../.pgdata", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const pg = new EmbeddedPostgres({ databaseDir: dir, user: "postgres", password: "postgres", port: 5433, persistent: true, initdbFlags: ["--encoding=UTF8", "--locale=C"] });

const fresh = !existsSync(`${dir}/PG_VERSION`);
if (fresh) await pg.initialise();
await pg.start();
if (fresh) await pg.createDatabase("interview");
console.log("Postgres ready: postgresql://postgres:postgres@localhost:5433/interview (Ctrl-C to stop)");

const stop = async () => {
  await pg.stop();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
setInterval(() => {}, 1 << 30);
