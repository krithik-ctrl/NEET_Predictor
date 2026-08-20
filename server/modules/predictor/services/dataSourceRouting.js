export const SOURCE_ROUTING = [
  { match: { counsellingType: "AIQ", seatType: "All India Quota" }, provider: "client" },
];

const matches = (rule, ctx) =>
  Object.entries(rule.match).every(([k, v]) => String(ctx[k]) === String(v));

export const resolveProvider = (ctx) => {
  const rule = SOURCE_ROUTING.find((r) => matches(r, ctx));
  return rule ? rule.provider : null;
};

// Non-numeric round buckets, ordered after the numbered rounds.
const ROUND_NAME_ORDER = { "NRI Quota": 90, "Minority Quota": 91 };

// Ranks any round label by the number inside it:
// "Round 1" -> 1, "Round 3 (Mop-up)" -> 3, "Round 4 (Stray Round)" -> 4,
// "Round 5" -> 5, "NRI Quota" -> 90, "Minority Quota" -> 91, null -> -1
export const roundRank = (round) => {
  if (round == null) return -1;
  const m = String(round).match(/\d+/);
  if (m) return Number(m[0]);
  return ROUND_NAME_ORDER[round] ?? 0;
};

const PREFERRED_YEAR = 2025;

// Per college + seatType + category: keep only the LAST available round.
// Prefer 2025; if a college has no 2025 row, fall back to its latest year,
// then take the highest round within that year.
export const pickLastRound = (rows) => {
  const groups = new Map();
  for (const c of rows) {
     const college = c.collegeId?._id?.toString() ?? String(c.collegeId);
    const course  = c.courseId?._id?.toString() ?? String(c.courseId);
    const spec    = c.specializationShort ?? "";
    const key = `${college}|${course}|${spec}|${c.seatType}|${c.category}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  }

  const out = [];
  for (const group of groups.values()) {
    const hasPreferred = group.some((r) => r.year === PREFERRED_YEAR);
    const targetYear = hasPreferred
      ? PREFERRED_YEAR
      : Math.max(...group.map((r) => r.year));

    let best = null;
    for (const r of group) {
      if (r.year !== targetYear) continue;
      if (!best || roundRank(r.round) > roundRank(best.round)) best = r;
    }
    if (best) out.push(best);
  }
  return out;
};