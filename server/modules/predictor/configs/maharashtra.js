const maharashtraConfig = {
  state: "Maharashtra",
  counsellingType: "STATE",
  rules: {
    sameState: {
      seatTypes: [
        "Government", "Government Women", "Management", "Minority",
        "Government Hilly Area", "Government Hilly Area Women",
        "Government Defense", "Government Defense Women",
        "Government MKB", "Government MKB Women","NRI"
      ],
    },
    otherState: {
      seatTypes: ["Management", "Minority","NRI"],
    },
  },
  categories: {
    "Government": ["EWS", "EWS-Orphan", "EWS-PH", "NT1", "NT1-Orphan", "NT1-PH", "NT2", "NT2-Orphan", "NT2-PH", "NT3", "NT3-Orphan", "NT3-PH", "OBC", "OBC-Orphan", "OBC-PH", "OPEN", "OPEN-Orphan", "OPEN-PH", "SC", "SC-Orphan", "SC-PH", "SEBC", "SEBC-Orphan", "SEBC-PH", "ST", "ST-Orphan", "ST-PH", "VJA", "VJA-Orphan", "VJA-PH"],
    "Government Women": ["EWS", "NT1", "NT2", "NT3", "OBC", "OPEN", "SC", "SEBC", "ST", "VJA"],
    "Government Hilly Area": ["IQ", "NT1", "NT3", "OBC", "OPEN", "SC", "ST", "VJA"],
    "Government Hilly Area Women": ["NT1", "OBC", "OPEN", "SC", "ST"],
    "Government Defense": ["DEF1", "DEF2", "DEF3"],
    "Government Defense Women": ["DEF1", "DEF2"],
    "Government MKB": ["OPEN"],
    "Government MKB Women": ["OPEN"],
    "Management": ["IQ","IQ-Minority"],
    "Minority": ["IQ-Minority", "OPEN-Minority"],
    "NRI": ["NRI"],
  },
};
export default maharashtraConfig;
