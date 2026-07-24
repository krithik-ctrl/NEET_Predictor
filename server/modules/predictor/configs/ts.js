const telanganaConfig = {
  state: "Telangana",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Competent Authority Quota",
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
    "Competent Authority Quota": [
      "General",
      "EWS",
      "BC-A",
      "BC-B",
      "BC-C",
      "BC-D",
      "BC-E",
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

export default telanganaConfig;