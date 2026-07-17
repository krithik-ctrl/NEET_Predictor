const goaConfig = {
  state: "Goa",

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
      "OBC",
      "SC",
      "ST",
      "EWS",
    ],
    "All India Quota": [
      "General",
    ],
  },
};

export default goaConfig;









