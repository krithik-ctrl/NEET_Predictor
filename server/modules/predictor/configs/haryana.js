const haryanaConfig = {
  state: "Haryana",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Institutional Preference Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Management Quota",
        "NRI Quota",
        "All India Quota",
        "Minority Quota",
      ],
    },
  },

categories: {
  "State Quota": [
    "General", "SC", "BC-A", "BC-B", "EWS", "SCD",
    "General-PwD", "BC-A-PwD", "BC-B-PwD", "SC-PwD", "SCD-PwD", "EWS-PwD",
    "General-ESM-FF", "General-ESM-FF1", "General-ESM-FF2", "General-ESM-FF3", "General-ESM-FF4", "General-ESM-FF6", "General-ESM-FF(DFF)", "General-ESM-FF6-PwD","General-ESM", "General-FF", "BC-A-ESM", "BC-A-ESM-FF", "BC-B-ESM", "SC-ESM",
    "BC-A-ESM-FF2", "BC-A-ESM-FF6",
    "BC-B-ESM-FF1", "BC-B-ESM-FF3", "BC-B-ESM-FF4", "BC-B-ESM-FF6", "BC-B-ESM-FF(DFF)",
    "SC-ESM-FF2", "SC-ESM-FF3", "SC-ESM-FF6",
    "SCD-ESM-FF", "SCD-ESM-FF3", "SCD-ESM-FF6",
    "EWS-ESM-FF", "EWS-ESM-FF3", "EWS-ESM-FF4",
  ],
  "Management Quota": ["General"],
  "NRI Quota": ["NRI-1", "NRI-2", "NRI-3", "NRI-4", "NRI-5", "NRI-6", "NRI-7","NRI"],
  "Minority Quota": ["Minority"],  // NEW seatType
  "All India Quota": ["General"],  // unused in this Excel
  "Institutional Preference Quota": ["IP-UR", "IP-BCA", "IP-BCB", "IP-SC", "IP-SCD"],
},
};

export default haryanaConfig;