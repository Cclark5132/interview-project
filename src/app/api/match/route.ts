import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { errorResponse } from "@/server/http";
import { ipLimit } from "@/server/ratelimit";

/** Public, read-only: how many published questions match a draft target. Powers the live count on the home page. */
export async function GET(req: Request) {
  try {
    await ipLimit(req, "match", 120, 60_000);
    const sp = new URL(req.url).searchParams;
    const discipline = sp.get("discipline") ?? "";
    if (!/^[a-z-]{2,40}$/.test(discipline)) return NextResponse.json({ error: "discipline required" }, { status: 400 });
    const clean = (v: string | null) => (v ?? "").split(",").filter((x) => /^[a-z-]{2,40}$/.test(x)).slice(0, 12);
    const topics = clean(sp.get("topics"));
    const role = clean(sp.get("role"))[0];
    const base = { status: "approved", disciplineId: discipline } as const;
    const [inDiscipline, matching] = await Promise.all([
      db.question.count({ where: base }),
      db.question.count({
        where: {
          ...base,
          ...(topics.length ? { topics: { some: { topicId: { in: topics } } } } : {}),
          ...(role ? { roles: { some: { roleId: role } } } : {}),
        },
      }),
    ]);
    // Counts only change when the owner publishes, so edge caching absorbs repeat clicks.
    return NextResponse.json({ inDiscipline, matching }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch (e) {
    return errorResponse(e);
  }
}
