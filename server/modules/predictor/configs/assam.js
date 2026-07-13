// predictor/config/assam.js

const assamConfig = {
  state: "Assam",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },

    otherState: {
      seatTypes: [],
    },
  },

  categories: {
    Government: [
      "General",
      "OBC",
      "EWS",
      "SC",
      "ST Hill",
      "ST Plain",
    ],
  },
};

export default assamConfig;