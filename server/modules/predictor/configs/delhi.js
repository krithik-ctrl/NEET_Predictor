const delhiConfig = {
  state: "Delhi",

  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Delhi State Quota",
        "IP University Quota",
        "Army Ward Quota",
      ],
    },

    otherState: {
      seatTypes: [
        "All India Quota",
      ],
    },
  },

categories: {
  "Delhi State Quota": [ "General","OBC","SC","ST","EWS",
    "General-PwD","SC-PwD" ],                                  // + 2
  "IP University Quota": [ "General","OBC","SC","ST","EWS",
    "General-PwD","SC-PwD","OBC-PwD",
    "General-Defence","SC-Defence","ST-Defence","OBC-Defence",
    "General-Defence-4","General-Defence-6" ],                // + 9
  "All India Quota": [ "General","OBC","SC","ST","EWS",
    "General-PwD" ],                                           // + 1
  "Army Ward Quota": [ "General" ],                            // + NEW seatType
},
};

export default delhiConfig;