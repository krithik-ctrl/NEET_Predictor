
const gujaratConfig = {
  state: "Gujarat",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government Quota",
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
    "Government Quota": [
      "OPEN",
      "EWS",
      "SEBC (OBC)",
      "SC",
      "ST",
    ],
    "Management Quota": [
      "OPEN",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "OPEN",
    ],
  },
};

export default gujaratConfig;