const arunachalPradeshConfig = {
  state: "Arunachal Pradesh",

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
  },
};

export default arunachalPradeshConfig;