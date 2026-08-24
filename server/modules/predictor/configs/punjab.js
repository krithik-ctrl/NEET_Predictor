const punjabConfig = {
  state: "Punjab",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Minority Quota",
        "Christian Minority Quota",
        "Sikh Minority Quota",
      ],
    },
    // State + minority pools are domicile-based; Management / NRI / All India
    // are open to other-state candidates.
    otherState: {
      seatTypes: [
        "Management Quota",
        "NRI Quota",
        "All India Quota",
      ],
    },
  },

  categories: {
    "State Quota": ["BC", "Backward Area", "Border Area", "Defence", "EWS", "FF", "Handi", "JK", "Open", "PP", "PwD", "RA", "SC", "Sports", "TA"],
    "Minority Quota": ["2A", "2A_To_2G_NRI", "2B", "2C", "2D", "2E", "2F", "2G", "Open"],
    "Christian Minority Quota": ["2A", "2A_To_2G_NRI", "2B", "2C", "2D", "2E", "2F", "2G"],
    "Sikh Minority Quota": ["NRI-Minority", "Open"],
    "Management Quota": ["BC", "Backward Area", "Border Area", "Defence", "JK", "Open", "RA", "SC", "Sports", "TA"],
    "NRI Quota": ["NRI", "NRI-I", "NRI-II"],
    "All India Quota": ["AIQ", "BC", "Backward Area", "Border Area", "Defence", "JK", "Open", "RA", "SC", "Sports", "TA" ,"Open (Converted)"],
  },
};

export default punjabConfig;