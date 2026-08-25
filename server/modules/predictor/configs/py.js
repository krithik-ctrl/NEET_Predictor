const pondicherryConfig = {
  state: "Pondicherry",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Government Quota",
        "Government School 10% Quota",
      ],
    },
    // Government / Govt-School pools are domicile-based; Management & NRI open to others.
    otherState: {
      seatTypes: [
        "Management Quota",
        "Management Quota - Telugu Minority",
        "Management Quota - Christian Minority",
        "NRI Quota",
      ],
    },
  },

  categories: {
    "Government Quota": ["KBM", "KEB", "KEW", "KGE", "KGE-FF", "KMB", "KMB-FF", "KOB", "KOB-FF", "KSC", "MBM", "MGE", "MMB", "MOB", "UBM", "UBM-FF", "UBM-PWD", "UBT", "UEB", "UEB-FF", "UEW", "UEW-PWD", "UGE", "UGE-ESM", "UGE-FF", "UGE-MSP", "UGE-PWD", "UMB", "UMB-ESM", "UMB-FF", "UMB-MSP", "UMB-PWD", "UOB", "UOB-ESM", "UOB-FF", "UOB-MSP", "UOB-PWD", "USC","UST", "USC-ESM", "USC-FF", "USC-MSP", "YEW", "YGE", "YMB", "YOB", "YSC"],
    "Government School 10% Quota": ["KGE", "KMB", "KOB", "KSC", "MGE", "UBM", "UEB", "UGE", "UMB", "UOB", "USC"],
    "Management Quota": ["AGE"],
    "Management Quota - Telugu Minority": ["UGE"],
    "Management Quota - Christian Minority": ["UGE"],
    "NRI Quota": ["NRI"],
  },
};

export default pondicherryConfig;