const manipurConfig = {
  state: "Manipur",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Management Quota",
        "NRI Quota",
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
      "OBC",
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

export default manipurConfig;