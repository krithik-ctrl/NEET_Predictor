const telanganaConfig = {
  state: "Telangana",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Competent Authority - Local (OU)",
        "Competent Authority - Unreserved",
        "Management Quota B - Local",
        "Management Quota B - Unreserved",
        "NRI Quota",
      ],
    },
    // Unreserved management + NRI pools open to other-state candidates;
    // Competent Authority local/unreserved are state-domicile.
    otherState: {
      seatTypes: [
        "Management Quota B - Unreserved",
        "NRI Quota",
      ],
    },
  },

  categories: {
    "Competent Authority - Local (OU)": ["BCA-FEM", "BCA-FEM-CAP", "BCA-GEN", "BCA-GEN-CAP", "BCA-GEN-PHO", "BCA-GEN-SCL", "BCB-FEM", "BCB-FEM-CAP", "BCB-FEM-PHO", "BCB-GEN", "BCB-GEN-CAP", "BCB-GEN-PHO", "BCB-GEN-SCL", "BCC-FEM", "BCC-GEN", "BCD-FEM", "BCD-FEM-CAP", "BCD-FEM-PHO", "BCD-GEN", "BCD-GEN-CAP", "BCD-GEN-PHO", "BCD-GEN-SCL", "BCE-FEM", "BCE-FEM-CAP", "BCE-GEN", "BCE-GEN-CAP", "EWS-FEM", "EWS-GEN", "MIN-FEM-CAP-MSM", "MIN-FEM-MSM", "MIN-FEM-MSM-PHO", "MIN-GEN-CAP-MSM", "MIN-GEN-MSM", "MIN-GEN-MSM-PHO", "OPEN-FEM", "OPEN-FEM-CAP", "OPEN-FEM-PHO", "OPEN-FEM-SCL", "OPEN-GEN", "OPEN-GEN-CAP", "OPEN-GEN-PHO", "OPEN-GEN-SCL", "SC-FEM", "SC-FEM-CAP", "SC-FEM-PHO", "SC-GEN", "SC-GEN-CAP", "SC-GEN-PHO", "SC-GEN-SCL", "SC1-FEM", "SC1-GEN", "SC2-FEM", "SC2-FEM-CAP", "SC2-GEN", "SC2-GEN-CAP", "SC2-GEN-PHO", "SC2-GEN-SCL", "SC3-FEM", "SC3-FEM-CAP", "SC3-GEN", "SC3-GEN-CAP", "ST-FEM", "ST-FEM-PHO", "ST-GEN", "ST-GEN-CAP", "ST-GEN-PHO", "ST-GEN-SCL"],
    "Competent Authority - Unreserved": ["BCA-FEM", "BCA-FEM-CAP", "BCA-GEN", "BCA-GEN-CAP", "BCB-FEM", "BCB-FEM-CAP", "BCB-GEN", "BCB-GEN-CAP", "BCC-FEM", "BCC-GEN", "BCD-FEM", "BCD-FEM-CAP", "BCD-GEN", "BCD-GEN-CAP", "BCE-FEM", "BCE-FEM-CAP", "BCE-GEN", "BCE-GEN-CAP", "MIN-FEM-CAP-MSM", "MIN-FEM-MSM", "MIN-GEN-CAP-MSM", "MIN-GEN-MSM", "OPEN-FEM", "OPEN-FEM-CAP", "OPEN-FEM-PHO", "OPEN-GEN", "OPEN-GEN-CAP", "OPEN-GEN-PHO", "SC-FEM", "SC-FEM-CAP", "SC-GEN", "SC-GEN-CAP", "SC-GEN-PHO", "ST-FEM", "ST-GEN", "ST-GEN-PHO"],
    "Management Quota B - Local": ["CAT B-FEM", "CAT B-FEM-MSM", "CAT B-GEN", "CAT B-GEN-MSM","MQ1"],
    "Management Quota B - Unreserved": ["CAT B-FEM", "CAT B-FEM-MSM", "CAT B-GEN", "CAT B-GEN-MSM", "CAT B-ArmyWards","MQ1-MSM" ,"MQ1"],
    "NRI Quota": ["NRI-FEM", "NRI-FEM-MSM", "NRI-GEN", "NRI-GEN-MSM","MQ2","MQ2-MSM","MQ3","MQ3-MSM"],
  },
};

export default telanganaConfig;