// predictor/config/karnataka.js
const karnatakaConfig = {
  state: "Karnataka",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["Government", "Private", "Others", "NRI"],
    },
    // Government (state-quota) seats are domicile-only; other-state
    // candidates can access Private / Others / NRI only.
    otherState: {
      seatTypes: ["Private", "Others", "NRI"],
    },
  },

  categories: {
    "Government": ["1G", "1H", "1K", "1KH", "1R", "1RH", "2AG", "2AH", "2AK", "2AKH", "2AR", "2ARH", "2BG", "2BH", "2BK", "2BKH", "2BR", "2BRH", "3AG", "3AH", "3AK", "3AKH", "3AR", "3ARH", "3BG", "3BH", "3BK", "3BKH", "3BR", "3BRH", "CAP", "D", "GM", "GMH", "GMK", "GMKH", "GMR", "GMRH", "JK", "NCC", "PH", "S-G", "SCG", "SCH", "SCK", "SCKH", "SCR", "SCRH", "SPO", "STG", "STH", "STK", "STKH", "STR", "STRH", "XD"],
    "Private": ["GMP", "GMPH", "MA", "MC", "ME", "MEH", "MM", "MMH", "MU", "OPN", "RC1", "RC2", "RC3", "RC4", "RC5", "RC6", "RC7", "RC8"],
    "Others": ["OTH"],
    "NRI": ["NRI"],
  },
};

export default karnatakaConfig;