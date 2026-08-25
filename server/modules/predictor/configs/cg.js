const chandigarhConfig = {
  state: "Chandigarh",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "UT Pool",
        "Institutional Preference Pool",

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
       "EWS"
    ],
    "Institutional Preference Pool": [
  "General",
  "SC",
  "EWS",
  "General (PwD)",
],
  },
};

export default chandigarhConfig;