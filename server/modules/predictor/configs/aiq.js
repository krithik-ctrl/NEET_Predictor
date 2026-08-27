const aiqConfig = {
  state: "AIQ",

  counsellingType: "AIQ",

  rules: {
    sameState: {
      seatTypes: [
        "All India Quota",
        "Open Seat Quota",
        "Deemed/Paid Seats Quota",
        "Non-Resident Indian Quota",
        "Muslim Minority Quota",
        "Jain Minority Quota",
        "Employees State Insurance Scheme(ESI) Quota",
        "Aligarh Muslim University (AMU) Quota",
        "Delhi University Quota",
        "AIIMS Quota",
        "JIPMER Quota",
        "JIPMER Quota (SO)",
        "DNB Post MBBS",
      ],
    },

    // AIQ has no domicile eligibility rules.
    // Both sections remain identical to keep a common schema.
    otherState: {
      seatTypes: [
        "All India Quota",
        "Open Seat Quota",
        "Deemed/Paid Seats Quota",
        "Non-Resident Indian Quota",
        "Muslim Minority Quota",
        "Jain Minority Quota",
        "Employees State Insurance Scheme(ESI) Quota",
        "Aligarh Muslim University (AMU) Quota",
        "Delhi University Quota",
        "AIIMS Quota",
        "JIPMER Quota",
        "JIPMER Quota (SO)",
        "IP University Quota",
        "DNB Post MBBS",
"BHU Quota",
      ],
    },
  },

  categories: {
    "All India Quota": [
      "Open",
      "EWS",
      "OBC",
      "SC",
      "ST",
      "Open PWD",
      "EWS PWD",
      "OBC PWD",
      "SC PWD",
      "ST PWD",
    ],

    "Open Seat Quota": [
      "Open",
    ],

    "Deemed/Paid Seats Quota": [
      "Open",
    ],

    "Non-Resident Indian Quota": [
      "Open",
    ],

    "Muslim Minority Quota": [
      "Open",
    ],

    "Jain Minority Quota": [
      "Open",
    ],

    "Employees State Insurance Scheme(ESI) Quota": [
      "Open",
      "EWS",
      "OBC",
      "SC",
      "ST",
      "Open PWD",
      "EWS PWD",
      "OBC PWD",
      "SC PWD",
      "ST PWD",
    ],

    "Aligarh Muslim University (AMU) Quota": [
      "Open",
    ],

    "Delhi University Quota": [
      "Open",
      "EWS",
      "OBC",
      "SC",
      "ST",
      "Open PWD",
      "EWS PWD",
      "OBC PWD",
      "SC PWD",
      "ST PWD",
    ],
     "AIIMS Quota": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD", "EWS PWD", "OBC PWD", "SC PWD", "ST PWD"], "JIPMER Quota": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD"], "JIPMER Quota (SO)": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD", "EWS PWD", "OBC PWD", "SC PWD", "ST PWD"],
     "IP University Quota": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD", "OBC PWD"],
"BHU Quota": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD"],
// in categories:
"DNB Post MBBS": ["Open", "EWS", "OBC", "SC", "ST", "Open PWD", "OBC PWD", "SC PWD"],
  },
};

export default aiqConfig;