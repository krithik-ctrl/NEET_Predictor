// predictor/config/andamanNicobar.js

const AndamanNicobar= {
  state: "Andaman & Nicobar Islands",

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
    "State Quota": [
      "Category 1",
      "Category 2",
      "Category 3A",
      "Category 3B",
      "Category 3AB",
      "Category 4",
      "Category 5",
      "EWS",
    ],
  },
};

export default AndamanNicobar;