const keralaConfig = {
  state: "Kerala",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "State Quota",
        "Self-Financing General", // ADDED — KER SF-General (self-financing community seats, private colleges)
      ],
    },

    otherState: {
      seatTypes: [
        "Non-Keralite Candidate",
        "NRI Quota", // ADDED — existed under categories but was missing from rules
      ],
    },
  },

  categories: {
    "State Quota": [
      "SM", "MU", "EZ", "LA", "SC", "ST", "VK", "DV", "KN", "BX", "KU", "EW",
      "AC", "BH", "MM",
      // ADDED (from KER Govt Seats, kept verbatim from source):
      "CC", "IN", "NO", "PI", "PT", "SD", "THE", "TO", "THAT ONE", "XS",
      "CD","DK","DX","HD","MQ","OE","WB"
    ], // note: SM etc. replace "State Merit (SM)" — raw code only, not the expanded label

    // ADDED seatType — from KER SF-General (self-financing general, private colleges):
    "Self-Financing General": [
      "AC", "BH", "BX", "DV", "IN", "KN", "MM", "NO", "SC", "SM", "ST",
      "THE", "TO", "THAT ONE", "VK","EW","EZ","KU","LA","MU","OE"
    ],

    "Non-Keralite Candidate": ["AM"], // replaces "Open (Private College)"

    "NRI Quota": [
      "NC", "NM", "NR",
      "No.", // ADDED verbatim from KER SF-NRI — almost certainly a corrupted "NR"; see note
    ],
  },
};

export default keralaConfig;