// Which provider to use per prediction segment. First match wins.
// Add rules here for future courses/years — no other code changes needed.
export const SOURCE_ROUTING = [
  { match: { counsellingType: "AIQ", seatType: "All India Quota" }, provider: "client" },
  // e.g. 2026 or new course later:
  // { match: { counsellingType: "AIQ", seatType: "All India Quota", year: 2026 }, provider: "client" },
];

const matches = (rule, ctx) =>
  Object.entries(rule.match).every(([k, v]) => String(ctx[k]) === String(v));

export const resolveProvider = (ctx) => {
  const rule = SOURCE_ROUTING.find((r) => matches(r, ctx));
  return rule ? rule.provider : null; // null → no provider filter (use your default data)
};

export const ROUND_ORDER = {
  "Round 1": 1, "Round 2": 2, "Round 3 (Mop-up)": 3,
  "Round 4 (Stray Round)": 4, "NRI Quota": 5, "Minority Quota": 6,
};

// Keep only the last available round per college + seatType + category.
export const pickLastRound = (rows) => {
  const best = new Map();
  for (const c of rows) {
    const college = c.collegeId?._id?.toString() ?? String(c.collegeId);
    const key = `${college}|${c.seatType}|${c.category}`;
    const ord = ROUND_ORDER[c.round] ?? 0;
    const cur = best.get(key);
    if (!cur || ord > (ROUND_ORDER[cur.round] ?? 0)) best.set(key, c);
  }
  return [...best.values()];
};