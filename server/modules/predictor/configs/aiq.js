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
  },
};

export default aiqConfig;