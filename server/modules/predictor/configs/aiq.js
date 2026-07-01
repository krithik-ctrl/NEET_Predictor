const aiqConfig = {
  state: "AIQ",

  counsellingType: "AIQ",

  rules: {
    sameState: {
      seatTypes: [
        "Aligarh Muslim University (AMU) Quota",
        "All India Quota",
        "Deemed/Paid Seats Quota",
        "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) DU Quota",
        "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) IP Quota",
        "Delhi University Quota",
        "Employees State Insurance Scheme(ESI) Quota",
        "Foreign Country Quota",
        "Internal -Puducherry UT Domicile Quota",
        "IP University Quota",
        "Jain Minority Quota",
        "Muslim Minority Quota",
        "Non-Resident Indian Quota",
        "Non-Resident Indian(AMU)Quota",
        "Open Seat Quota",
      ],
    },

    // AIQ has no domicile eligibility rules.
    // Both sections remain identical to keep a common schema.
    otherState: {
      seatTypes: [
        "Aligarh Muslim University (AMU) Quota",
        "All India Quota",
        "Deemed/Paid Seats Quota",
        "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) DU Quota",
        "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) IP Quota",
        "Delhi University Quota",
        "Employees State Insurance Scheme(ESI) Quota",
        "Foreign Country Quota",
        "Internal -Puducherry UT Domicile Quota",
        "IP University Quota",
        "Jain Minority Quota",
        "Muslim Minority Quota",
        "Non-Resident Indian Quota",
        "Non-Resident Indian(AMU)Quota",
        "Open Seat Quota",
      ],
    },
  },

  categories: {
    "Aligarh Muslim University (AMU) Quota": [
      "Open",
    ],

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

    "Deemed/Paid Seats Quota": [
      "Open",
    ],

    "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) DU Quota": [
      "Open",
    ],

    "Delhi NCR Children/Widows of Personnel of the Armed Forces (CW) IP Quota": [
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

    "Foreign Country Quota": [
      "Open",
    ],

    "Internal -Puducherry UT Domicile Quota": [
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

    "IP University Quota": [
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

    "Jain Minority Quota": [
      "Open",
    ],

    "Muslim Minority Quota": [
      "Open",
    ],

    "Non-Resident Indian Quota": [
      "Open",
    ],

    "Non-Resident Indian(AMU)Quota": [
      "Open",
    ],

    "Open Seat Quota": [
      "Open",
    ],
  },
};

export default aiqConfig;