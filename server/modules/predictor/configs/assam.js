// predictor/config/assam.js
const assamConfig = {
  state: "Assam",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["State Quota"],
    },
    otherState: {
      seatTypes: ["NRI Quota"],
    },
  },

  categories: {
    "State Quota": ["Char Area", "Chutia", "EWS", "EWS-PwD", "Ex-Serviceman", "Extremist Violence", "Freedom Fighter", "Govt School", "HSC Rank", "Koch-Rajbongshi", "Martyr", "Moran", "Motak", "OBC/MOBC (NCL)", "OBC/MOBC (NCL)-PwD", "SC", "ST(H)", "ST(P)", "ST(P)-PwD", "Sports", "TGL/EX-TGL Barak Valley", "TGL/EX-TGL Brahmaputra Valley", "Tai-Ahom", "UR", "UR-PwD"],
    "NRI Quota": ["NRI-13", "NRI-3", "NRI-4", "NRI-5", "NRI-6", "NRI-8"],
  },
};

export default assamConfig;