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

export default rajasthanConfig;