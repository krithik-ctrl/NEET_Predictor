import ExcelJS from "exceljs";

/*
|--------------------------------------------------------------------------
| Excel export — mirrors the PDF's data (same preparePdfData output), but as
| a flat, filter-friendly .xlsx. Two sheets:
|   1) Summary   — who exported + role, when, applied filters, statistics
|   2) Users     — one row per user
|--------------------------------------------------------------------------
*/

// NA-safe cell value: null / undefined / "" / "-" → "-"
const val = (v) => {
  if (v === null || v === undefined) return "-";
  const s = String(v).trim();
  return s === "" ? "-" : s;
};

const fmtDate = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const titleCase = (v) => {
  const s = val(v);
  return s === "-" ? s : s.charAt(0).toUpperCase() + s.slice(1);
};

// Plans other than "-"/"Free" are premium; everything else shows as "Free".
const planLabel = (p) => (p && p !== "-" && p !== "Free" ? p : "Free");

const BRAND = "1D4ED8";        // header fill
const HEADER_TEXT = "FFFFFF";  // header font

export const generateUsersExcel = async (exportData) => {
  const { metadata = {}, users = [], statistics = {} } = exportData ?? {};

  const wb = new ExcelJS.Workbook();
  wb.creator = "Vedant Solutions";
  wb.created = new Date();

  /*
  |------------------------------------------------------------------
  | Sheet 1 — Summary
  |------------------------------------------------------------------
  */
  const summary = wb.addWorksheet("Summary", {
    views: [{ showGridLines: false }],
  });
  summary.columns = [{ width: 26 }, { width: 48 }];

  const titleRow = summary.addRow(["User Export Report"]);
  titleRow.font = { size: 16, bold: true, color: { argb: BRAND } };
  summary.addRow([]);

  const exportedBy = metadata.downloadedByRole
    ? `${val(metadata.downloadedBy)} (${titleCase(metadata.downloadedByRole)})`
    : val(metadata.downloadedBy);

  const infoRows = [
    ["Exported by", exportedBy],
    ["Generated at", fmtDate(metadata.generatedAt)],
    ["Total records", val(metadata.totalRecords ?? users.length)],
  ];
  infoRows.forEach(([k, v]) => {
    const r = summary.addRow([k, v]);
    r.getCell(1).font = { bold: true };
  });

  // Applied filters (only the ones actually set)
  const af = metadata.appliedFilters ?? {};
  const activeFilters = Object.entries(af).filter(
    ([, v]) => v !== undefined && v !== null && v !== "" && v !== "filtered"
  );
  if (activeFilters.length) {
    summary.addRow([]);
    const fh = summary.addRow(["Applied Filters"]);
    fh.font = { bold: true, color: { argb: BRAND } };
    activeFilters.forEach(([k, v]) => {
      const r = summary.addRow([titleCase(k), val(v)]);
      r.getCell(1).font = { bold: true };
    });
  }

  // Statistics
  summary.addRow([]);
  const sh = summary.addRow(["Statistics"]);
  sh.font = { bold: true, color: { argb: BRAND } };
  const statRows = [
    ["Total Users", statistics.totalUsers],
    ["Students", statistics.students],
    ["Super Admins", statistics.superAdmins],
    ["Sub Admins", statistics.subAdmins],
    ["Total Admins", statistics.totalAdmins],
    ["Active", statistics.activeUsers],
    ["Inactive", statistics.inactiveUsers],
    ["Verified", statistics.verifiedUsers],
    ["Unverified", statistics.unverifiedUsers],
    ["Premium", statistics.premiumUsers],
    ["Free", statistics.freeUsers],
  ];
  statRows.forEach(([k, v]) => {
    const r = summary.addRow([k, v ?? 0]);
    r.getCell(1).font = { bold: true };
  });

  /*
  |------------------------------------------------------------------
  | Sheet 2 — Users (flat table)
  |------------------------------------------------------------------
  */
  const ws = wb.addWorksheet("Users", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  ws.columns = [
    { header: "#", key: "n", width: 6 },
    { header: "Name", key: "name", width: 26 },
    { header: "Role", key: "role", width: 12 },
    { header: "Status", key: "status", width: 10 },
    { header: "Plan", key: "plan", width: 14 },
    { header: "Email", key: "email", width: 30 },
    { header: "Mobile", key: "mobile", width: 16 },
    { header: "State", key: "state", width: 16 },
    { header: "City", key: "city", width: 16 },
    { header: "Preferred Course", key: "preferredCourse", width: 20 },
    { header: "Predictions", key: "predictions", width: 12 },
    { header: "Saved", key: "saved", width: 10 },
    { header: "Choice Lists", key: "choiceLists", width: 12 },
    { header: "Verified", key: "verified", width: 10 },
    { header: "Profile Completed", key: "profileCompleted", width: 16 },
    { header: "Joined", key: "joined", width: 20 },
    { header: "Last Login", key: "lastLogin", width: 20 },
  ];

  users.forEach((u, i) => {
    ws.addRow({
      n: i + 1,
      name: val([u.firstName, u.lastName].filter(Boolean).join(" ")),
      role: titleCase(u.role),
      status: titleCase(u.status),
      plan: planLabel(u.plan),
      email: val(u.email),
      mobile: val(u.mobile),
      state: val(u.state),
      city: val(u.city),
      preferredCourse: val(u.preferredCourseName),
      predictions: u.predictionCount ?? 0,
      saved: (u.savedColleges || []).length,
      choiceLists: (u.choiceLists || []).length,
      verified: u.isVerified ? "Yes" : "No",
      profileCompleted: u.profileCompleted ? "Yes" : "No",
      joined: fmtDate(u.joinedDate),
      lastLogin: fmtDate(u.lastLogin),
    });
  });

  // Header styling
  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: HEADER_TEXT } };
  head.alignment = { vertical: "middle" };
  head.height = 20;
  head.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
    cell.border = { bottom: { style: "thin", color: { argb: "CBD5E1" } } };
  });

  // Auto filter across the table
  ws.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: ws.columnCount },
  };

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
};