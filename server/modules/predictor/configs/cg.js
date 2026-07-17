const chandigarhConfig = {
  state: "Chandigarh",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "UT Pool",
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
    "UT Pool": [
      "UR (General)",
      "OBC (NCL)",
      "SC",
      "ST",
      "EWS",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "General",
    ],
  },
};

export default chandigarhConfig;