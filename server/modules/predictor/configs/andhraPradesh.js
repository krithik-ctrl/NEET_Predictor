const andhraPradeshConfig = {
  state: "Andhra Pradesh",
  counsellingType: "STATE",

  rules: {
    sameState: {
      seatTypes: [
        "Convenor - AP Local",
        "Convenor - AP Unreserved",
        "Convenor - Local (AU)",
        "Convenor - Local (OU)",
        "Convenor - Local (SVU)",
        "Convenor - Unreserved",
        "Management Quota B1",
        "Management Quota B2",
        "Management CA-SF",
        "Management Quota B1 Minority",
        "Management CA-NRI",
        "Management Quota C (NRI)",
        "Management Quota C (NRI) Minority",
      ],
    },
    // Convenor (government) local-area pools are domicile-only; other-state
    // candidates access the private management / NRI pools only.
    otherState: {
      seatTypes: [
        "Management Quota B1",
        "Management Quota B1 Minority",
        "Management CA-NRI",
        "Management Quota C (NRI)",
        "Management Quota C (NRI) Minority",
      ],
    },
  },

  categories: {
    "Convenor - AP Local": ["BCA-FEM", "BCA-GEN", "BCB-FEM", "BCB-GEN", "BCB-GEN-PHO", "BCC-GEN", "BCD-FEM", "BCD-GEN", "BCE-FEM", "BCE-GEN", "EWS-FEM", "EWS-GEN", "OPEN-FEM", "OPEN-FEM-PHO", "OPEN-GEN", "OPEN-GEN-NCC", "OPEN-GEN-PHO", "SC-FEM", "SC-GEN", "ST-FEM", "ST-GEN"],
    "Convenor - AP Unreserved": ["ANGLO", "BCA-FEM", "BCA-FEM-CAP", "BCA-FEM-PHO", "BCA-GEN", "BCA-GEN-CAP", "BCA-GEN-PHO", "BCB-FEM", "BCB-FEM-CAP", "BCB-GEN", "BCB-GEN-CAP", "BCB-GEN-PHO", "BCC-FEM", "BCC-GEN", "BCD-FEM", "BCD-FEM-CAP", "BCD-GEN", "BCD-GEN-CAP", "BCE-FEM", "BCE-FEM-CAP", "BCE-GEN", "BCE-GEN-CAP", "MIN-GEN-MSM", "OPEN-FEM", "OPEN-FEM-CAP", "OPEN-GEN", "OPEN-GEN-CAP", "OPEN-GEN-NCC", "OPEN-GEN-PHO", "OPEN-GEN-SG", "OPEN-GEN-SGCU", "SC-FEM", "SC-FEM-CAP", "SC-GEN", "SC-GEN-CAP", "SC-GEN-PHO", "SC1-GEN", "SC2-FEM", "SC2-GEN", "SC2-GEN-CAP", "SC3-FEM", "SC3-FEM-CAP", "SC3-GEN", "SC3-GEN-CAP", "ST-FEM", "ST-GEN", "ST-GEN-CAP", "ST-GEN-PHO"],
    "Convenor - Local (AU)": ["BCA-FEM", "BCA-FEM-NCC", "BCA-FEM-PHO", "BCA-GEN", "BCA-GEN-NCC", "BCA-GEN-PHO", "BCA-GEN-SG", "BCA-GEN-SGCU", "BCB-FEM", "BCB-FEM-NCC", "BCB-FEM-PHO", "BCB-FEM-PMC", "BCB-GEN", "BCB-GEN-NCC", "BCB-GEN-PHO", "BCB-GEN-PMC", "BCB-GEN-SG", "BCB-GEN-SGCU", "BCC-FEM", "BCC-GEN", "BCC-GEN-PHO", "BCD-FEM", "BCD-FEM-NCC", "BCD-FEM-PHO", "BCD-FEM-SGCU", "BCD-GEN", "BCD-GEN-NCC", "BCD-GEN-PHO", "BCD-GEN-SG", "BCD-GEN-SGCU", "BCE-FEM", "BCE-FEM-PHO", "BCE-GEN", "BCE-GEN-NCC", "BCE-GEN-PHO", "EWS-FEM", "EWS-GEN", "MIN-GEN-MSM", "OPEN-FEM", "OPEN-FEM-NCC", "OPEN-FEM-PHO", "OPEN-FEM-PMC", "OPEN-FEM-SG", "OPEN-FEM-SGCU", "OPEN-GEN", "OPEN-GEN-NCC", "OPEN-GEN-PHO", "OPEN-GEN-PMC", "OPEN-GEN-SG", "OPEN-GEN-SGCU", "SC-FEM", "SC-FEM-NCC", "SC-FEM-PHO", "SC-FEM-SG", "SC-FEM-SGCU", "SC-GEN", "SC-GEN-NCC", "SC-GEN-PHO", "SC-GEN-PMC", "SC-GEN-SG", "SC-GEN-SGCU", "SC1-FEM", "SC1-GEN", "SC1-GEN-PHO", "SC2-FEM", "SC2-FEM-PHO", "SC2-GEN", "SC2-GEN-NCC", "SC2-GEN-PHO", "SC2-GEN-SG", "SC2-GEN-SGCU", "SC3-FEM", "SC3-FEM-NCC", "SC3-FEM-PHO", "SC3-GEN", "SC3-GEN-NCC", "SC3-GEN-PHO", "SC3-GEN-SG", "SC3-GEN-SGCU", "ST-FEM", "ST-FEM-PHO", "ST-GEN", "ST-GEN-NCC", "ST-GEN-PHO", "ST-GEN-SG", "ST-GEN-SGCU"],
    "Convenor - Local (OU)": ["BCA-FEM", "BCA-GEN", "BCB-FEM", "BCB-GEN", "BCC-FEM", "BCD-FEM", "BCD-GEN", "BCE-FEM", "BCE-GEN", "EWS-FEM", "EWS-GEN", "OPEN-FEM", "OPEN-GEN", "OPEN-GEN-PHO", "SC-FEM", "SC-GEN", "ST-FEM", "ST-GEN"],
    "Convenor - Local (SVU)": ["BCA-FEM", "BCA-FEM-PHO", "BCA-FEM-PMC", "BCA-GEN", "BCA-GEN-NCC", "BCA-GEN-PHO", "BCA-GEN-SG", "BCA-GEN-SGCU", "BCB-FEM", "BCB-FEM-NCC", "BCB-FEM-PHO", "BCB-GEN", "BCB-GEN-NCC", "BCB-GEN-PHO", "BCB-GEN-SG", "BCB-GEN-SGCU", "BCC-FEM", "BCC-GEN", "BCC-GEN-PHO", "BCD-FEM", "BCD-FEM-PHO", "BCD-GEN", "BCD-GEN-NCC", "BCD-GEN-PHO", "BCD-GEN-SG", "BCD-GEN-SGCU", "BCE-FEM", "BCE-FEM-PHO", "BCE-GEN", "BCE-GEN-NCC", "BCE-GEN-PHO", "EWS-FEM", "EWS-GEN", "MIN-GEN-MSM", "OPEN-FEM", "OPEN-FEM-NCC", "OPEN-FEM-PHO", "OPEN-FEM-PMC", "OPEN-FEM-SG", "OPEN-FEM-SGCU", "OPEN-GEN", "OPEN-GEN-NCC", "OPEN-GEN-PHO", "OPEN-GEN-PMC", "OPEN-GEN-SG", "OPEN-GEN-SGCU", "SC-FEM", "SC-FEM-NCC", "SC-FEM-PHO", "SC-GEN", "SC-GEN-NCC", "SC-GEN-PHO", "SC-GEN-PMC", "SC-GEN-SG", "SC-GEN-SGCU", "SC1-FEM", "SC1-GEN", "SC1-GEN-PHO", "SC2-FEM", "SC2-FEM-PHO", "SC2-FEM-SG", "SC2-GEN", "SC2-GEN-NCC", "SC2-GEN-PHO", "SC2-GEN-SG", "SC2-GEN-SGCU", "SC3-FEM", "SC3-FEM-PHO", "SC3-GEN", "SC3-GEN-NCC", "SC3-GEN-PHO", "SC3-GEN-SG", "SC3-GEN-SGCU", "ST-FEM", "ST-FEM-PHO", "ST-GEN", "ST-GEN-NCC", "ST-GEN-PHO", "ST-GEN-SG", "ST-GEN-SGCU"],
    "Convenor - Unreserved": ["ANGLO", "BCA-FEM", "BCA-GEN", "BCB-FEM", "BCB-FEM-CAP", "BCB-GEN", "BCB-GEN-CAP", "BCC-GEN", "BCD-FEM", "BCD-FEM-CAP", "BCD-GEN", "BCD-GEN-CAP", "BCE-GEN", "MIN-GEN-MSM", "OPEN-FEM", "OPEN-FEM-CAP", "OPEN-GEN", "OPEN-GEN-CAP", "OPEN-GEN-PHO", "SC-FEM", "SC-FEM-CAP", "SC-GEN", "SC-GEN-CAP", "SC-GEN-PHO", "ST-GEN"],
    "Management Quota B1": ["CAT B1"],
    "Management Quota B2": ["CAT B2"],
    "Management CA-SF": ["CA SF"],
    "Management Quota B1 Minority": ["CAT B1-MINORITY"],
    "Management CA-NRI": ["CA NRI"],
    "Management Quota C (NRI)": ["CAT C(NRI)"],
    "Management Quota C (NRI) Minority": ["CAT C(NRI)-MINORITY"],
  },
};

export default andhraPradeshConfig;