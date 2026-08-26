const tamilNaduConfig = {
  state: "Tamil Nadu",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government 92.5%",
        "Government 7.5%",
        "Government PwD",
        "Government Ex-Servicemen",
        "Government Sports",
        "Government IRT Ward",
        "CMC Minority 20%",
        "Management",
        "Management Minority",
        "CMC 50%",
      ],
    },

    otherState: {
      seatTypes: [
        "NRI",
        "NRI Lapsed",
      ],
    },
  },

  categories: {
    "Government 92.5%":        ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"],
    "Government 7.5%":         ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"],
    "Government PwD":          ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"],
    "Government Ex-Servicemen":["OC", "BC", "MBC", "SC"],
    "Government Sports":       ["OC", "BC", "BCM", "MBC", "SC"],
    "Government IRT Ward":     ["BC", "BCM", "MBC", "SC", "SCA"],
    "CMC Minority 20%":        ["OC", "BC","CMC 20% Minority"],

    "Management":         ["GEN"],
    "Management Minority":["Telugu Minority", "Christian Minority", "Malayalam Minority"],
    "CMC 50%":            ["GEN", "CMC Staff", "CMC Minority Network","CMC-Institutional Preference",],

    "NRI":        ["NRI"],
    "NRI Lapsed": ["NRI Lapsed"],
  },
};

export default tamilNaduConfig;