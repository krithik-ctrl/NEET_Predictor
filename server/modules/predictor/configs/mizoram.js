const mizoramConfig = {
  state: "Mizoram",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "All India Quota",
        "NRI Quota",
      ],
    },
  },

  categories: {
    "State Quota": [
      "General",
      "EWS",
      "OBC",
      "SC",
      "ST",
    ],

    "All India Quota": [
      "General",
    ],

    "NRI Quota": [
      "NRI",
    ],
  },
};

export default mizoramConfig;