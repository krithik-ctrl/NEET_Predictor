const westBengalConfig = {
  state: "West Bengal",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["State Quota"],
    },
    otherState: {
      seatTypes: ["Management Quota", "NRI Quota", "All India Quota"],
    },
  },

  categories: {
    "State Quota": ["EWS", "EWS-PwD", "OBC", "OBC A", "OBC A-PwD", "OBC B", "OBC B-PwD", "SC", "SC-PwD", "ST", "UR", "UR-PwD"],
    "Management Quota": ["Management", "UR"],
    "NRI Quota": ["NRI"],
    "All India Quota": ["UR"],
  },
};

export default westBengalConfig;