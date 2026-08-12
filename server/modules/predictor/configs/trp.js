const tripuraConfig = {
  state: "Tripura",
  counsellingType: "STATE",
  rules: {
    sameState: { seatTypes: ["State Quota", "State Quota (Govt Fee)"] },
    otherState: { seatTypes: ["All India Quota"] },
  },
  categories: {
    "State Quota": ["General", "OBC", "SC", "ST", "EWS", "General-PwD", "General-WESM", "ST-WESM"],
    "State Quota (Govt Fee)": ["General", "ST", "SC", "General-WESM"],
    "All India Quota": ["General", "OBC", "SC", "ST"],
  },
};
export default tripuraConfig;