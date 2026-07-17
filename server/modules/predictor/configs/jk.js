const jammuKashmirConfig = {
  state: "Jammu and Kashmir",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
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
    "State Quota": [
      "Open Merit (OM)",
      "RBA",
      "ALC/IB",
      "SC",
      "ST",
      "EWS",
    ],
    "Management Quota": [
      "Open Merit (OM)",
    ],
    "NRI Quota": [
      "NRI",
    ],
    "All India Quota": [
      "Open Merit (OM)",
    ],
  },
};

export default jammuKashmirConfig;
