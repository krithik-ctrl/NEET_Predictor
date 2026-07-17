const westBengalConfig = {
  state: "West Bengal",

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
      ],
    },
  },

  categories: {
    "State Quota": [
      "UR",
      "EWS",
      "OBC-A",
      "OBC-B",
      "SC",
      "ST",
    ],
    "Management Quota": [
      "UR",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "UR",
    ],
  },
};

export default westBengalConfig;