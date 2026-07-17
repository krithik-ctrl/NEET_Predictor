const puducherryConfig = {
  state: "Puducherry",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government Quota",
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
    "Government Quota": [
      "General",
      "BC",
      "MBC",
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

export default puducherryConfig;
