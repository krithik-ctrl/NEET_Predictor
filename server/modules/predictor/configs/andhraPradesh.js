const andhraPradeshConfig = {
  state: "Andhra Pradesh",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Convenor Quota",
        "Management Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "Management Quota",
      ],
    },
  },

  categories: {
    "Convenor Quota": [
      "BC- C (Female)",
      "BC-A (Female)",
      "BC-A (Male)",
      "BC-B (Female)",
      "BC-B (Male)",
      "BC-C (Male)",
      "BC-D (Female)",
      "BC-D (Male)",
      "BC-E (Female)",
      "BC-E (Male)",
      "OC-(Female)",
      "OC-(Male)",
      "SC 1 (Female)",
      "SC 1 (Male)",
      "ST (Female)",
      "ST (Male)",
      "SC 2 (Male)",
      "SC 2 (Female)",
      "SC 3 (Male)",
      "SC 3 (Female)"
    ],

    "Management Quota": [
      "BC- C (Female)",
      "BC-A (Female)",
      "BC-A (Male)",
      "BC-B (Female)",
      "BC-B (Male)",
      "BC-C (Male)",
      "BC-D (Female)",
      "BC-D (Male)",
      "BC-E (Female)",
      "BC-E (Male)",
      "OBC Female",
      "OBC Male",
      "OC-(Female)",
      "OC-(Male)",
      "SC 1 (Female)",
      "SC 1 (Male)",
      "ST (Female)",
      "ST (Male)",
      "SC 2 (Male)",
      "SC 2 (Female)",
      "SC 3 (Male)",
      "SC 3 (Female)"
    ],
  },
};

export default andhraPradeshConfig;