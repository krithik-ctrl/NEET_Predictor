const biharConfig = {
  state: "Bihar",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Management Quota",
        "NRI Quota",
        "All India Quota",
        "Minority Quota",       // NEW — covers private minority-institution seats
      ],
    },
  },

  categories: {
    "State Quota": [
      "UR (General)",
      "UR (General) - Female",
      "EWS",
      "EWS - Female",
      "BC",
      "BC - Female",
      "EBC",
      "EBC - Female",
      "SC",
      "SC - Female",
      "ST",
      "ST - Female",
      "PwD",                    // NEW — Divyang/disability quota (raw: DQ, DQ-GEN)
      "RCG",                    // NEW — raw code as-is; meaning not confirmed, see note below
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
    "Minority Quota": [         // NEW seatType
      "Muslim Minority",
      "Sikh Minority",
      "MM"
    ],
  },
};

export default biharConfig;

/*
NOTES ON WHAT CHANGED vs your original config, and why:

1. Gender split (UR/BC/EBC/SC/ST/EWS):
   The raw Excel reports "-GEN" and "-FEM" as two DIFFERENT, simultaneously-present
   rank series for the same college/round (verified: e.g. IGIMS Patna 2023 round 1 —
   UR-GEN cutoff rank 6547 vs UR-FEM cutoff rank 6094). Your original config only
   declared one category per group, which would have silently overwritten one
   gender's data with the other in Mongo (same unique-index key). Added a
   "- Female" variant for each.

2. Legacy unsuffixed codes (BC, EBC, SC, EWS with no suffix):
   Only appear in 2023 rounds, and never overlap with "-GEN" (only ever coexist with
   "-FEM"). These are just the pre-2024 naming for the GEN bucket — mapped directly
   to the same category as "-GEN" (e.g. raw "BC" and "BC-GEN" both -> "BC").

3. PwD (raw: DQ / DQ-GEN):
   Disability/Divyang quota — rank values in the 100K-1M+ range confirm a small
   reserved pool. DQ (2023) and DQ-GEN (2024/25) never overlap for the same round,
   so both map to a single new "PwD" category.

4. RCG:
   Standalone rank series (magnitude close to general/BC ranks), no GEN/FEM split,
   never overlapping with anything else. I don't have enough signal from the sheet
   alone to know the exact meaning of this Bihar-specific code, so I passed it
   through as-is ("RCG") rather than guessing a mislabeled mapping. Recommend
   confirming with BCECEB's counselling brochure and renaming later if needed —
   it's an isolated category, so renaming it won't cause a migration headache.

5. Minority Quota (raw Quota: Bihar-Priv-MUSLMIN / Bihar-Priv-SIKHMIN, raw Category: MM / SM):
   These are private minority-institution seats, distinct from "Management Quota"
   (raw Bihar-Priv-GEN). Added as a new seatType under otherState with its own
   category list, rather than force-fitting them into Management Quota.
*/