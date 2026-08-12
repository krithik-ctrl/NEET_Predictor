const keralaConfig = {
  state: "Kerala",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Non-Keralite Candidate",
      ],
    },
  },

categories: {
  "State Quota": [
    "SM", "MU", "EZ", "LA", "SC", "ST", "VK", "DV", "KN", "BX", "KU", "EW",
    "AC", "BH", "MM",
  ],  // note: SM etc. replace "State Merit (SM)" — raw code only, not the expanded label
  "Non-Keralite Candidate": ["AM"],  // replaces "Open (Private College)"
  "NRI Quota": ["NC", "NM", "NR"],  // NEW seatType
},
};

export default keralaConfig;