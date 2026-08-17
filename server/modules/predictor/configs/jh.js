const jharkhandConfig = {
  state: "Jharkhand",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["State Quota"],
    },
    // Private management (all-India) pool open to other-state candidates.
    otherState: {
      seatTypes: ["Management Quota"],
    },
  },

  categories: {
    "State Quota": ["BC-I", "BC-I-Autism", "BC-I-Blind", "BC-I-Deaf", "BC-I-Deaf & Blind", "BC-I-Locomotor", "BC-I-PwD", "BC-II", "BC-II-Blind", "BC-II-Deaf", "BC-II-Locomotor", "BC-II-PwD", "EWS", "EWS-Blind", "EWS-Deaf", "EWS-Locomotor", "EWS-PwD", "Primitive Tribe", "SC", "SC-Blind", "SC-Deaf", "SC-Locomotor", "SC-PwD", "ST", "ST-PwD", "UR", "UR-Autism", "UR-Blind", "UR-Deaf", "UR-Deaf & Blind", "UR-Locomotor", "UR-PwD"],
    "Management Quota": ["UR"],
  },
};

export default jharkhandConfig;

/*
CHANGE LOG

[BDS run, Aug 2026] "BC-II-Locomotor" ADDED to "State Quota".
  The BDS workbook's JHARKHAND sheet carries a raw "BC-II-Locomotor" row under the
  "JHKND-Govt Seats" quota (Dental Institute, RIMS, Ranchi — one data point,
  CR 2023 round 1 = 671559). The State Quota list already declared BC-I-Locomotor,
  EWS-Locomotor, SC-Locomotor and UR-Locomotor, plus BC-II-Blind / BC-II-Deaf /
  BC-II-PwD — the BC-II Locomotor variant was the one gap in that grid. Folding it
  into plain "BC-II" would have collided with the existing BC-II series for the same
  college/year/round, so it is declared in its own right. Inserted in alphabetical
  position between "BC-II-Deaf" and "BC-II-PwD" to match the existing ordering.
  Nothing else changed — all pre-existing seatTypes and categories are retained.

NOTE ON QUOTA MAPPING (BDS cutoff config, no backend change required)
  The JHARKHAND sheet has THREE raw quota values but this config declares only two
  seatTypes. They map as:
      JHKND-Govt Seats       -> State Quota        (govt college: RIMS Ranchi)
      JHKND-Pvt-Govt Quota   -> State Quota        (state govt quota seats inside
                                                    private colleges)
      JHKND-Pvt-MNGAllIndia  -> Management Quota   (matches the otherState comment
                                                    above exactly)
  Two raw quotas therefore collapse onto "State Quota". This is SAFE for the unique
  index because the institute sets are disjoint: RIMS appears only under
  JHKND-Govt Seats, and the three private colleges only under the Pvt- quotas.
  Verified 0 duplicate keys post-mapping. The only college appearing under two
  quotas is Vananchal Dental Coll, Garhwa (Pvt-Govt Quota + Pvt-MNGAllIndia), and
  those resolve to two different seatTypes.
  Trade-off: after mapping, govt-college state quota and govt-quota-in-private-
  college become indistinguishable by seatType (only collegeId separates them),
  even though their ranks sit in completely different bands (RIMS UR ~40-55k vs
  private UR ~700k-1.4M). If the predictor needs that split, add a
  "State Quota - Private" seatType here (mirroring the Odisha "Govt School Quota -
  Private" pattern) and repoint JHKND-Pvt-Govt Quota to it.
*/