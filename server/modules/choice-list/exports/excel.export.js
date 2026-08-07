import ExcelJS from "exceljs";

// ---- palette (ARGB) ----
const BRAND = "FF1D4ED8"; // blue-700
const WHITE = "FFFFFFFF";
const INK = "FF0F172A";
const MUTED = "FF64748B";
const ZEBRA = "FFF8FAFC";
const LINE = "FFE2E8F0";
const GREEN = "FF16A34A";
const AMBER = "FFD97706";
const RED = "FFDC2626";

const CHANCE = {
  SAFE: { label: "Safe", color: GREEN },
  MODERATE: { label: "Moderate", color: AMBER },
  RISKY: { label: "Risky", color: RED },
};
const chanceOf = (c) => CHANCE[c] ?? { label: "—", color: MUTED };

const clean = (v) => {
  const s = (v ?? "").toString().trim();
  return !s || s.toLowerCase() === "data required" ? "NA" : s;
};
const feesText = (n) => (n && Number(n) > 0 ? `₹${Number(n).toLocaleString("en-IN")}` : "NA");
const seatsText = (n) => (n && Number(n) > 0 ? String(n) : "NA");

/**
 * Builds the Choice List workbook. Returns an ExcelJS.Workbook.
 */
export const buildChoiceListExcel = async ({ choiceList, items = [], studentAIR }) => {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Vedant Solutions";
  wb.created = new Date();

  const ws = wb.addWorksheet("Choice List", {
    properties: { defaultRowHeight: 18 },
    views: [{ state: "frozen", ySplit: 8 }],
  });

  ws.columns = [
    { key: "idx", width: 6 },
    { key: "college", width: 50 },
    { key: "state", width: 18 },
    { key: "type", width: 14 },
    { key: "chance", width: 13 },
    { key: "fees", width: 16 },
    { key: "seats", width: 10 },
  ];

  const brandFill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };

  // --- Title band (rows 1-2) ---
  ws.mergeCells("A1:G1");
  const title = ws.getCell("A1");
  title.value = "Vedant Solutions";
  title.font = { name: "Calibri", size: 18, bold: true, color: { argb: WHITE } };
  title.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  title.fill = brandFill;
  ws.getRow(1).height = 28;

  ws.mergeCells("A2:G2");
  const sub = ws.getCell("A2");
  sub.value = "NEET Counselling · Choice List";
  sub.font = { name: "Calibri", size: 10, color: { argb: WHITE } };
  sub.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  sub.fill = brandFill;
  ws.getRow(2).height = 18;

  // --- Meta (rows 4-5) ---
  const generated = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const meta = [
    ["List Name", clean(choiceList?.name), "Student AIR", studentAIR != null ? String(studentAIR) : "NA"],
    ["Generated", generated, "Total Colleges", String(items.length)],
  ];
  meta.forEach((row, i) => {
    const r = 4 + i;
    ws.getCell(`A${r}`).value = row[0];
    ws.getCell(`B${r}`).value = row[1];
    ws.getCell(`D${r}`).value = row[2];
    ws.getCell(`E${r}`).value = row[3];
    ["A", "D"].forEach((c) => (ws.getCell(`${c}${r}`).font = { bold: true, size: 10, color: { argb: MUTED } }));
    ["B", "E"].forEach((c) => (ws.getCell(`${c}${r}`).font = { bold: true, size: 10, color: { argb: INK } }));
  });

  // --- Chance summary (row 6) ---
  const counts = items.reduce(
    (a, it) => {
      if (it.chance === "SAFE") a.safe++;
      else if (it.chance === "MODERATE") a.mod++;
      else if (it.chance === "RISKY") a.risk++;
      return a;
    },
    { safe: 0, mod: 0, risk: 0 },
  );
  const summary = [
    ["A6", "Safe", GREEN], ["B6", String(counts.safe), INK],
    ["C6", "Moderate", AMBER], ["D6", String(counts.mod), INK],
    ["E6", "Risky", RED], ["F6", String(counts.risk), INK],
  ];
  summary.forEach(([addr, val, color]) => {
    ws.getCell(addr).value = val;
    ws.getCell(addr).font = { bold: true, size: 10, color: { argb: color } };
  });

  // --- Table header (row 8) ---
  const headerRowIdx = 8;
  const headers = ["#", "College", "State", "Type", "Chance", "Fees / yr", "Seats"];
  const hr = ws.getRow(headerRowIdx);
  headers.forEach((h, i) => {
    const cell = hr.getCell(i + 1);
    cell.value = h;
    cell.font = { bold: true, size: 10, color: { argb: WHITE } };
    cell.fill = brandFill;
    cell.alignment = { vertical: "middle", horizontal: i >= 5 ? "right" : "left", indent: 1 };
  });
  hr.height = 20;

  // --- Data rows ---
  items.forEach((it, i) => {
    const row = ws.getRow(headerRowIdx + 1 + i);
    const ch = chanceOf(it.chance);

    row.getCell(1).value = i + 1;
    row.getCell(2).value = clean(it.collegeId?.name);
    row.getCell(3).value = clean(it.collegeId?.state);
    row.getCell(4).value = clean(it.collegeId?.ownership);
    row.getCell(5).value = ch.label;
    row.getCell(6).value = feesText(it.fees);
    row.getCell(7).value = seatsText(it.seats);

    row.eachCell((cell, col) => {
      const isName = col === 2;
      const isChance = col === 5;
      cell.font = {
        size: 10,
        bold: isName || isChance,
        color: { argb: isChance ? ch.color : isName ? INK : MUTED },
      };
      cell.alignment = { vertical: "middle", horizontal: col >= 6 ? "right" : "left", indent: 1, wrapText: isName };
      cell.border = { bottom: { style: "thin", color: { argb: LINE } } };
      if (i % 2 === 1) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ZEBRA } };
    });
  });

  return wb;
};

export default buildChoiceListExcel;