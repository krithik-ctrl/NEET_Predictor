const uttarPradeshConfig = {
  state: "Uttar Pradesh",
  counsellingType: "STATE",

  rules: {
    // UP-domicile candidates: state quota seats in govt/private colleges
    sameState: {
      seatTypes: [
        "State Quota",
      ],
    },
    // Non-domicile / open-to-all / institutional seats
    otherState: {
      seatTypes: [
        "Management Quota",
        "NRI Quota",
        "Muslim Minority Quota",
        "Jain Minority Quota",
        "All India Quota",
      ],
    },
  },

  categories: {
    "State Quota": ["General", "OBC", "SC", "ST", "EWS"],
    "Management Quota": ["General"],
    "NRI Quota": ["NRI"],
    "Muslim Minority Quota": ["General"],
    "Jain Minority Quota": ["General"],
    "All India Quota": ["General"],
  },
};

export default uttarPradeshConfig;