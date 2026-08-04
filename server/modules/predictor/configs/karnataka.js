// predictor/config/karnataka.js
const karnatakaConfig = {
  state: "Karnataka",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government",
        "Private",
        "Others",
        "NRI",
      ],
    },
    // Government (state-quota) seats are domicile-only; other-state
    // candidates can access Private / Others / NRI only.
    otherState: {
      seatTypes: [
        "Private",
        "Others",
        "NRI",
      ],
    },
  },

  categories: {
    // Headline General-pool cutoffs: General Merit + four OBC blocks
    // (2A, 2B-Muslim, 3A-Vokkaliga, 3B-Lingayat) + SC + ST.
    Government: [
      "GM",
      "2AG",
      "2BG",
      "3AG",
      "3BG",
      "SCG",
      "STG",
    ],
    // COMEDK Open, government-quota GM (+371J), main minority pools, NRI.
    Private: [
      "OPN",
      "GMP",
      "GMPH",
      "MM",
      "MU",
      "NRI",
    ],
    Others: [
      "OPN",
    ],
    NRI: [
      "OPN",
    ],
  },
};

export default karnatakaConfig;