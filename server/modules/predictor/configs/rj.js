const rajasthanConfig = {
  state: "Rajasthan",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Management Quota",
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
      "UR (General)",
      "OBC",
      "MBC",
      "SC",
      "ST",
      "EWS",
      "ST-STA",
    ],
    "Management Quota": [
      "General","OBC", "MBC", "SC", "ST", "EWS",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "General","OBC", "MBC", "SC", "ST", "ST-STA", "EWS",
    ],
  },
};

export default rajasthanConfig;