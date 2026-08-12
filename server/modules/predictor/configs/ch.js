


const chattisgarhConfig = {
  state: "Chhattisgarh",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
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
  "State Quota": [
    "UR (General)", "OBC", "SC", "ST", "EWS",
    "General-Female", "OBC-Female", "SC-Female", "ST-Female",
    "General-EX", "ST-EX",
    "General-S", "ST-S",
    "General-PwD", "OBC-PwD", "SC-PwD", "ST-PwD",
    "General-FF", "ST-FF",
    "SST",
  ],
  "Management Quota": ["General", "General-Female", "OBC", "OBC-Female", "SC", "SC-Female", "ST", "ST-Female", "General-EX", "General-PwD"],
  "NRI Quota": ["NRI", "OBC", "General-Female"],
  "All India Quota": ["General"],  // unused in this Excel, left as-is
},
};

export default chattisgarhConfig;