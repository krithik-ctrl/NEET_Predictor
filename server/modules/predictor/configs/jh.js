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
    "State Quota": ["BC-I", "BC-I-Autism", "BC-I-Blind", "BC-I-Deaf", "BC-I-Deaf & Blind", "BC-I-Locomotor", "BC-I-PwD", "BC-II", "BC-II-Blind", "BC-II-Deaf", "BC-II-PwD", "EWS", "EWS-Blind", "EWS-Deaf", "EWS-Locomotor", "EWS-PwD", "Primitive Tribe", "SC", "SC-Blind", "SC-Deaf", "SC-Locomotor", "SC-PwD", "ST", "ST-PwD", "UR", "UR-Autism", "UR-Blind", "UR-Deaf", "UR-Deaf & Blind", "UR-Locomotor", "UR-PwD"],
    "Management Quota": ["UR"],
  },
};

export default jharkhandConfig;