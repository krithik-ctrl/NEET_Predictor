const andhraPradeshConfig = {
  state: "Andhra Pradesh",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Convenor Quota",
        "Management Quota B1",
        "Management Quota B2",
        "NRI Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Management Quota B1",
        "NRI Quota",
      ],
    },
  },

  categories: {
    "Convenor Quota": [
      "OC Male",
      "OC Female",

      "EWS Male",
      "EWS Female",

      "BC-A Male",
      "BC-A Female",

      "BC-B Male",
      "BC-B Female",

      "BC-C Male",
      "BC-C Female",

      "BC-D Male",
      "BC-D Female",

      "BC-E Male",
      "BC-E Female",

      "SC Male",
      "SC Female",

      "ST Male",
      "ST Female",
    ],

    "Management Quota B1": [
      "General",
    ],

    "Management Quota B2": [
      "General",
    ],

    "NRI Quota": [
      "NRI",
    ],
  },
};

export default andhraPradeshConfig;