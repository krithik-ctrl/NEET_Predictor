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
  "State Quota": [
    "General-OP","General-EX","General-FF","General-GL","General-NC","General-PH",
    "OBC-OP","OBC-EX","OBC-FF","OBC-GL","OBC-NC","OBC-PH",
    "EWS-OP","EWS-EX","EWS-FF","EWS-GL","EWS-NC","EWS-PH",
    "SC-OP","SC-EX","SC-FF","SC-GL","SC-NC","SC-PH",
    "ST-OP","ST-GL","UR Service", "BC Service", "SC Service","BS","SS"
  ],
  "Management Quota": ["General-OP","UR"],   // Excel uses UR-OP → General-OP, not plain "General"
  "Minority Quota": ["General-OP"],     // combined Muslim+Jain; Excel doesn't split them
  "NRI Quota": ["NRI"],                 // unused — no NRI rows in this Excel
  "All India Quota": ["General"],       // unused
},
};

export default uttarPradeshConfig;