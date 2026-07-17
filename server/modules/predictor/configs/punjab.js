






const punjabConfig = {
  state: "Punjab",

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
      "General",
      "SC",
      "BC (Backward Class)",
      "EWS",
      "Sikh Minority",
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

export default punjabConfig;