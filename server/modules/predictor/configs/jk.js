const jammuKashmirConfig = {
  state: "Jammu and Kashmir",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Management Quota",
        "Hindu Minority Quota",
        "P&B Quota",
      ],
    },
    otherState: {
      seatTypes: ["NRI Quota", "All India Quota"],
    },
  },

  categories: {
    "State Quota": ["ALC", "ALC/IB", "ALC/IB-CDP", "ALC/IB-PwD", "CDP", "CDP-PwD", "EWS", "EWS-PwD", "JKPM", "JKPM-PwD", "OBC", "OBC-PwD", "OM", "OM-CDP", "OM-CDP-IV","OM-JKPM", "OM-CDP-VI", "OM-PVT", "OM-PwD", "OM-PwD-L", "OM-PwD-V", "OM-SP", "OSC", "OSC-PwD", "PSP", "RBA", "RBA-CDP", "RBA-CDP-VI", "RBA-PwD", "RBA-SP", "SC", "SC-CDP", "SC-PwD", "SP", "ST", "ST-I", "ST-I-PwD", "ST-II", "ST-II-CDP", "ST-II-PwD", "ST-II-PwD-V", "ST-PwD", "STK", "STL"],
    "Management Quota": ["MQ", "OM", "OM-MQ"],
    "Hindu Minority Quota": ["HM"],
    "P&B Quota": ["P&B"],
    "NRI Quota": ["NRI"],
    "All India Quota": ["OM"],
  },
};

export default jammuKashmirConfig;