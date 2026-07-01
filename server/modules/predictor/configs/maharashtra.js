const maharashtraConfig = {
  state: "Maharashtra",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "DEF1 (Defence 1)",
        "DEF2 (Defence 2)",
        "DEF3 (Defence 3)",
        "EWS",
        "Hilly Area",
        "I.Q. - Institutional Quota",
        "MK - Motak",
        "MKB - Maharashtra Karnataka Border",
        "NTB - Nomadic Tribes B",
        "NTC - Nomadic Tribes C",
        "NTD - Nomadic Tribes D",
        "OBC",
        "OPEN",
        "ORPHAN",
        "PWD/PH",
        "SC",
        "SEBC - Socially and Educationally Backward Classes",
        "VJA - Vimukta Jati",
        "ST",
      ],
    },

    otherState: {
      seatTypes: [
        "I.Q. - Institutional Quota",
      ],
    },
  },

  categories: {
    "DEF1 (Defence 1)": [
      "EWS",
      "EWS Women",
      "NTC",
      "NTC Women",
      "NTD",
      "NTD Women",
      "OBC",
      "OBC Women",
      "OPEN",
      "Open Women",
      "SEBC",
      "SEBC Women",
      "VJA",
    ],

    "DEF2 (Defence 2)": [
      "NTC",
      "NTC Women",
      "NTD",
      "NTD Women",
      "OBC",
      "OBC Women",
      "OPEN",
      "Open Women",
      "SEBC",
      "SEBC Women",
    ],

    "DEF3 (Defence 3)": [
      "OPEN",
      "Open Women",
    ],

    "EWS": [
      "EWS",
      "EWS Women",
    ],

    "Hilly Area": [
      "EWS",
      "EWS Women",
      "NTB",
      "NTB Women",
      "NTC",
      "NTC Women",
      "NTD",
      "NTD Women",
      "OBC",
      "OBC Women",
      "OPEN",
      "Open Women",
      "SC",
      "SC Women",
      "SEBC",
      "SEBC Women",
      "ST",
      "ST Women",
      "VJA",
      "VJA Women",
    ],

    "I.Q. - Institutional Quota": [
      "Minority",
      "OPEN",
    ],

    "MK - Motak": [
     "Minority",
    ],

    "MKB - Maharashtra Karnataka Border": [
      "MKB",
      "MKB Women",
    ],

    "NTB - Nomadic Tribes B": [
      "NTB",
      "NTB Women",
    ],

    "NTC - Nomadic Tribes C": [
      "NTC",
      "NTC Women",
    ],

    "NTD - Nomadic Tribes D": [
      "NTD",
      "NTD Women",
    ],

    "OBC": [
      "OBC",
      "OBC Women",
    ],

    "OPEN": [
    "OPEN",
      "Open Women",
    ],

    "ORPHAN": [
    "OPEN"
    ],

    "PWD/PH": [

          "EWS",
      "NTB",
      "NTC",
      "NTD",
      "OBC",
      "OPEN",
      "SC",
      "SEBC",
      "ST",
      "VJA",
     
    ],

    "SC": [
         "SC",
      "SC Women",
  
    ],

    "SEBC - Socially and Educationally Backward Classes": [
        "SEBC",
      "SEBC Women",
      
    ],

    "VJA - Vimukta Jati": [
        "VJA",
      "VJA Women",

    ],

    "ST": [
              "ST",
      "ST Women",
    ],
  },
};

export default maharashtraConfig;