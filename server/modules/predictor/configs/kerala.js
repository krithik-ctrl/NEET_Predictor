const keralaConfig = {
  state: "Kerala",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Non-Keralite Candidate",
      ],
    },
  },

  categories: {
    "Non-Keralite Candidate": [
      "Open (Private College)",
    ],
    "State Quota":["State Merit (SM)"]
  },
};

export default keralaConfig;