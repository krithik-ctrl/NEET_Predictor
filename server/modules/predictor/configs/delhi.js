const delhiConfig = {
  state: "Delhi",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Delhi State Quota",
        "IP University Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "All India Quota",
      ],
    },
  },

  categories: {
    "Delhi State Quota": [
      "General",
      "OBC",
      "SC",
      "ST",
      "EWS",
    ],
    "IP University Quota": [
      "General",
      "OBC",
      "SC",
      "ST",
      "EWS",
    ],
    "All India Quota": [
      "General",
      "OBC",
      "SC",
      "ST",
      "EWS",
    ],
  },
};

export default delhiConfig;