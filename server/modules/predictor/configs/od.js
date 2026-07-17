const odishaConfig = {
  state: "Odisha",

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
      "UR (Open)",
      "EWS",
      "SC",
      "ST",
    ],
    "Management Quota": [
      "UR (Open)",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "UR (Open)",
    ],
  },
};

export default odishaConfig;