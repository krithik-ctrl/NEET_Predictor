const maharashtraConfig = {
  state: "Maharashtra",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: ["Government", "Government Women", "Management", "Minority"],
    },
    // Government pools are domicile-only; other-state candidates access the
    // private Management / Minority pools only.
    otherState: {
      seatTypes: ["Management", "Minority"],
    },
  },

  categories: {
    "Government": ["EWS", "EWS-Orphan", "EWS-PH", "NT1", "NT1-Orphan", "NT1-PH", "NT2", "NT2-Orphan", "NT2-PH", "NT3", "NT3-Orphan", "NT3-PH", "OBC", "OBC-Orphan", "OBC-PH", "OPEN", "OPEN-Orphan", "OPEN-PH", "SC", "SC-Orphan", "SC-PH", "SEBC", "SEBC-Orphan", "SEBC-PH", "ST", "ST-Orphan", "ST-PH", "VJA", "VJA-Orphan", "VJA-PH"],
    "Government Women": ["EWS", "NT1", "NT2", "NT3", "OBC", "OPEN", "SC", "SEBC", "ST", "VJA"],
    "Management": ["IQ"],
    "Minority": ["IQ-Minority", "OPEN-Minority"],
  },
};

export default maharashtraConfig;