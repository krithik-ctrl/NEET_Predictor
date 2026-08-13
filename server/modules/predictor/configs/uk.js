const uttarakhandConfig = {
  state: "Uttarakhand",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "State Quota - Private",   // NEW — raw: UK-Pvt-StateQuota
      ],
    },

    otherState: {
      seatTypes: [
        "Management Quota",
        "NRI Quota",
        "All India Quota",
      ],
    },
  },

  categories: {
    "State Quota": [
      "UR (General)", "UR (General) - Women", "UR (General) - DPW", "UR (General) - FF", "UR (General) - Orphan", "UR (General) - PwD",
      "OBC", "OBC - Women", "OBC - DPW", "OBC - FF", "OBC - Orphan", "OBC - PwD",
      "SC", "SC - Women", "SC - DPW", "SC - FF",
      "ST", "ST - Women", "ST - DPW",
      "EWS", "EWS - Women", "EWS - DPW", "EWS - FF", "EWS - PwD",
      "WKM",                      // NEW — raw code kept as-is, meaning not confirmed, see note below
    ],
    "State Quota - Private": [    // NEW seatType
      "UR (General)", "UR (General) - Women", "UR (General) - DPW", "UR (General) - FF", "UR (General) - Orphan",
      "OBC", "OBC - Women", "OBC - DPW",
      "SC", "SC - Women",
      "ST", "ST - Women",
    ],
    "Management Quota": [
      "General",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "General",
    ],
  },
};

export default uttarakhandConfig;

/*
NOTES ON WHAT CHANGED vs your original config, and why:

1. Sub-quota suffixes (-Women, -DPW, -FF, -Orphan, -PwD) on UR/OBC/SC/ST/EWS:
   Verified these are real, simultaneously-reported rank series distinct from the
   base category - e.g. Doon Med Coll Dehradun 2023 round 1: UR=22054, UR-Women=14585,
   UR-DPW=17196, UR-FF=391833, UR-PwD=1019415, all present at once. Your original
   config declared only one category per group, which would have silently dropped
   most of these rows via unique-index collision. Added suffixed variants:
   "- Women" (women's horizontal reservation, confident), "- FF" (Freedom Fighter
   quota, confident), "- PwD" (Persons with Disability, confident), "- Orphan"
   (confident), "- DPW" (kept the raw code as-is - likely a defence/paramilitary
   dependent or war-widow reservation given Uttarakhand's defence recruitment base,
   but not certain enough from the sheet alone to relabel it - safe to rename later,
   it's isolated).

2. WKM (raw Quota: UK-Govt-StateQuota, standalone, no suffix pairing):
   A separate rank series (40K-340K range) with no GEN/base counterpart. Likely a
   "Kin/Widow of Martyr" reservation given the state's military demographic, but
   passed through as the raw code rather than guessing a mislabeled category name -
   confirm with the counselling brochure and rename later if needed.

3. State Quota - Private (raw Quota: UK-Pvt-StateQuota):
   This is NOT the same as "Management Quota" - it carries the full category system
   (UR/OBC/SC/ST with the same sub-quota suffixes), not a single "General" bucket,
   and the ranks are a distinct series from the Govt-college State Quota rows for
   the same category/round. It's state-counselled quota seats administered inside
   private colleges, structurally different from a private college's own discretionary
   "Management Quota". Added as its own seatType rather than merged into either
   existing one. "Management Quota" itself has no matching raw data in this sheet -
   kept declared and unused, since it may still be populated in other Uttarakhand
   data sources.
*/