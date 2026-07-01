const tamilNaduConfig = {
  state: "Tamil Nadu",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government",
        "Private",
        "NRI",
      ],
    },

    otherState: {
      seatTypes: [
        "NRI",
      ],
    },
  },

  categories: {
    Government: [
      "OPN",
    ],

    Private: [
      "OPN",
    ],

    NRI: [
      "GN",
      "GN-MN",
      "GN-MN-F",
    ],
  },
};

export default tamilNaduConfig;