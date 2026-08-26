const madhyaPradeshConfig = {
  state: "Madhya Pradesh",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["State Quota", "Management Quota"],
    },
    otherState: {
      seatTypes: ["NRI Quota", "All India Quota"],
    },
  },

  categories: {
    "State Quota": ["EWS/FF/OP", "EWS/GS/OP", "EWS/PH/OP", "EWS/SN/OP", "EWS/X/OP", "OBC/FF/OP", "OBC/GS/OP", "OBC/PH/OP", "OBC/SN/OP", "OBC/X/OP", "SC/FF/OP", "SC/GS/OP", "SC/PH/OP", "SC/SN/OP", "SC/X/OP", "ST/GS/OP", "ST/PH/OP", "ST/SN/OP", "ST/X/OP", "UR/FF/OP", "UR/GS/OP", "UR/PH/OP", "UR/SN/OP", "UR/X/OP"],
    "Management Quota": ["OBC/GS/OP", "OBC/PH/OP", "OBC/X/OP", "SC/GS/OP", "SC/PH/OP", "SC/X/OP", "ST/GS/OP", "ST/X/OP", "UR/GS/OP", "UR/PH/OP", "UR/X/OP"],
    "NRI Quota": ["NRI","NRI (Non Domicile)", ],
    "All India Quota": ["UR (General)"],
  },
};

export default madhyaPradeshConfig;