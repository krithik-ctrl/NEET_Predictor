const odishaConfig = {
  state: "Odisha",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Management Quota",
        "Govt School Quota",           // raw: OdishaGov-GovtSchool
        "Govt School Quota - Private", // raw: OdishaPvt-GovtSchool
      ],
    },

    otherState: {
      seatTypes: [
        "NRI Quota",
        "All India Quota",
      ],
    },
  },

  categories: {
    "State Quota": [
      "UR (Open)", "UR (Open) - GC", "UR (Open) - Ex-Serviceman", "UR (Open) - PwD",
      "EWS", "EWS - GC", "EWS - Ex-Serviceman", "EWS - PwD",
      "SC", "SC - GC", "SC - Ex-Serviceman", "SC - PwD",
      "ST", "ST - GC", "ST - Ex-Serviceman", "ST - PwD",
    ],
    "Management Quota": [
      "UR (Open)", "UR (Open) - GC", "UR (Open) - Ex-Serviceman",
      "SC", "SC - GC", "SC - Ex-Serviceman", // NEW — raw: SC-EX under "Odisha Private"
      "ST", "ST - GC",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "UR (Open)",
    ],
    "Govt School Quota": [
      "UR (Open)", "EWS", "SC", "ST",
    ],
    "Govt School Quota - Private": [
      "UR (Open)", "SC", "ST",
    ],
  },
};

export default odishaConfig;

/*
NOTES ON WHAT CHANGED vs your original config, and why:

1. Sub-quota suffixes (-GC, -EX, -PwD) on UR/EWS/SC/ST:
   Verified these are real, simultaneously-reported rank series, distinct from the
   base category — e.g. SCB Cuttack 2023 round 1: OP=4771, OP-GC=7375, OP-EX=11013,
   OP-PwD=559892, all present in the same round. Your original config declared only
   one category per group ("UR (Open)", "SC", etc.), which would silently drop 3 of
   every 4 rows for the same college/round via unique-index collision. Added
   suffixed variants: "- GC" (kept as-is, exact meaning not certain from the sheet
   alone — magnitude sits just above the base OP rank, plausibly a "Govt College
   background" reservation; rename later if you have the official code list),
   "- Ex-Serviceman" (Defence/Ex-servicemen quota, ranks moderately elevated,
   standard across Indian state counselling), "- PwD" (Persons with Disability —
   ranks in the 100K-1M+ range confirm a small reserved pool).

2. Govt School Quota (raw Quota: OdishaGov-GovtSchool / OdishaPvt-GovtSchool):
   These are NOT duplicates of "Odisha Govt"/"Odisha Private" — verified a real,
   simultaneous, and consistently much-higher rank series for the same
   college/category/round (e.g. Sri Jagannath Med Coll, OP, 2023 round 1: Odisha
   Govt=15214 vs OdishaGov-GovtSchool=43105). This is a separate reservation
   (for candidates educated in Odisha govt schools) layered on top of the base
   State/Management quota split, so it needs its own seatType — added two, mirroring
   the existing Govt/Private college split ("Govt School Quota" for govt colleges,
   "Govt School Quota - Private" for private colleges) rather than merging into
   State Quota / Management Quota.

3. Management Quota category list:
   Your original config only declared "UR (Open)" for Management Quota, but the raw
   "Odisha Private" quota also carries SC/SC-GC/ST/ST-GC/OP-EX rows with real data
   (no EWS or PwD reported for private colleges in this sheet). Expanded to match
   what's actually present.

4. [BDS run, Aug 2026] "SC - Ex-Serviceman" ADDED to "Management Quota".
   The BDS workbook's ODISHA sheet carries a raw "SC-EX" row under the "Odisha
   Private" quota (Hi-Tech DentalColl, Bhubaneswar — one data point, CR 2025
   round 2 = 464784). Management Quota previously declared "SC" and "SC - GC" but
   not the Ex-Serviceman variant, so this row had no legal target: mapping it to
   plain "SC" would have collided with the existing Management/SC series for the
   same college/year/round. The string already existed under "State Quota", so
   this is a list addition, not a new category value. Nothing else was changed —
   all pre-existing seatTypes and categories are retained.
   Note: the BDS ODISHA sheet exercises only a subset of this config (5 quotas,
   9 categories, 2 dental colleges). The unused EWS-/ST- suffixed variants remain
   declared for the MBBS run.
*/