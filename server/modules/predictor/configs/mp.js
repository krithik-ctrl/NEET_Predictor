const madhyaPradeshConfig = {
  state: "Madhya Pradesh",

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
      "SC",
      "ST",
      "EWS",
    ],
    "Management Quota": [
      "UR (General)",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "UR (General)",
    ],
  },
};

export default madhyaPradeshConfig;