const himachalPradeshConfig = {
  state: "Himachal Pradesh",
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
    "State Quota": ["BA", "Chld JK", "Chld TBT", "EWS", "GEN", "IRDP/BPL", "OBC", "PwD", "SC", "SGC", "ST", "W-FF", "WW-Defence", "WW-ExS","GEN-GDO","SC-GDO","ST-GDO","SGC-GDO"],
    "Management Quota": ["GEN", "OBC", "SC", "ST","GEN-GDO","SC-GDO"],
    "NRI Quota": ["NRI", "NRI-Sponsored"],
    "All India Quota": ["General"],
  },
};

export default himachalPradeshConfig;