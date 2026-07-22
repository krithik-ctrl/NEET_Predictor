const sikkimConfig = {
  state: "Sikkim",

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
      "EWS",
      "OBC",
      "SC",
      "ST",
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

export default sikkimConfig;