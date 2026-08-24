const chattisgarhConfig = {
  state: "Chhattisgarh",

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
        "Minority Quota",      // NEW — raw: CHTSGRH-Pvt-Minority
        "NRI Quota",
        "All India Quota",
        "	Other State",  // NEW — raw: CHTSGRH-Pvt-OtherState
      ],
    },
  },

categories: {
  "State Quota": [
    "UR (General)", "OBC", "SC", "ST", "EWS",
    "General-Female", "OBC-Female", "SC-Female", "ST-Female",
    "General-EX", "ST-EX",
    "General-S", "ST-S",
    "General-PwD", "OBC-PwD", "SC-PwD", "ST-PwD",
    "General-FF", "ST-FF",
    "SST",
  ],
  "Management Quota": ["General", "General-Female", "OBC", "OBC-Female", "SC", "SC-Female", "ST", "ST-Female", "General-EX", "General-PwD"],
  "Minority Quota": ["Minority", "General"],   // NEW — raw cats: MINORITY, UR
  "NRI Quota": ["NRI", "OBC", "General-Female" , "General"],
  "All India Quota": ["General"],  // unused in this Excel, left as-is
  "  Other State": ["UR", "UR-Female", "OBC", "OBC-Female", "SC", "SC-Female", "ST", "ST-Female"],  // NEW — raw cats: UR, OBC, SC, ST, EWS
},
};

export default chattisgarhConfig;

/*
CHANGE LOG

[BDS run, Aug 2026] "Minority Quota" seatType ADDED to otherState, with
categories ["Minority", "General"].

  WHY THIS IS REQUIRED, NOT COSMETIC:
  The BDS workbook's CHATTISGARH sheet has a fourth raw quota,
  "CHTSGRH-Pvt-Minority", carried by ChhattisgrhDentColl, Rajnandgaon only
  (2 rows: raw category UR and raw category MINORITY). The config previously had
  no seatType it could map to.

  Folding it into "Management Quota" was tested and COLLIDES. Rajnandgaon reports
  a UR row under BOTH quotas simultaneously, with different ranks:
      CHTSGRH-Pvt-Minority   / UR  -> 2025 R1 = 621900
      CHTSGRH-Pvt-MgmtQuota  / UR  -> 2025 R1 = 954144
  Both would resolve to (collegeId, Management Quota, "General", 2025, "Round 1",
  provider) and one would be lost to the unique index. The ~330k rank gap confirms
  these are genuinely different seat pools, not a duplicate report.

  Category names follow the existing house style: the minority pool's open seats
  reuse "General" (as Management Quota does), and the reserved minority seats get
  "Minority". Placed in otherState alongside Management Quota because minority
  seats in private colleges are not part of the state merit pool.

  Nothing else changed — State Quota, Management Quota, NRI Quota and All India
  Quota keep every seatType and category they already declared.

NOTES ON THE BDS CUTOFF CONFIG (no further backend change needed)

1. Two raw quotas collapse onto "State Quota":
       CHTSGRH-Govt Seats     -> State Quota   (Govt Dental Coll, Raipur)
       CHTSGRH-Pvt-GovtQuota  -> State Quota   (govt-quota seats in the 6 private
                                                colleges)
   Safe for the unique index — the institute sets are disjoint (Raipur appears
   only under Govt Seats). Verified 0 duplicate keys. Same trade-off noted for
   Jharkhand: after mapping, only collegeId separates the two pools.

2. Raw "UR" is quota-dependent, so categoryOverrideByQuota IS used here:
       UR under State Quota pools      -> "UR (General)"
       UR under CHTSGRH-Pvt-MgmtQuota  -> "General"
       UR under CHTSGRH-Pvt-Minority   -> "General"
   This is the first state in the BDS run to need that field.

3. Rounds 5-8 are exercised (2024 runs to 8 rounds, 2025 to 5). Confirm
   "Round 5".."Round 8" all exist in the Mongo round enum.

4. Unused by this sheet but retained: "NRI Quota", "All India Quota", "EWS",
   and the ST-EX / ST-S / OBC-PwD / SC-PwD / ST-PwD / General-FF / ST-FF / SST
   State Quota categories.
*/