
const gujaratConfig = {
  state: "Gujarat",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government Quota",
        "Management Quota",
        "Local Quota"
      ],
    },

    otherState: {
      seatTypes: [
        "NRI Quota",
        "All India Quota",
      ],
    },
  },

categories: {
  "Government Quota": ["OPEN", "EWS", "SEBC (OBC)", "SC", "ST"],
  "Local Quota": ["OPEN", "EWS", "SEBC (OBC)", "SC", "ST"],   // NEW — municipal colleges
  "Management Quota": ["OPEN"],
  "NRI Quota": ["NRI"],
  "All India Quota": ["OPEN"],   // unused in this Excel
},
};

export default gujaratConfig;