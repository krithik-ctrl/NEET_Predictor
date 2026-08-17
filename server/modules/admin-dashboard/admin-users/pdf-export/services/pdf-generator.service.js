import PDFDocument from "pdfkit";

// ---- brand ----
const BRAND = "#2563EB";
const INK = "#0F172A";
const MUTED = "#64748B";
const LINE = "#E2E8F0";
const ZEBRA = "#F8FAFC";
const GREEN = "#16A34A";
const RED = "#DC2626";
const GOLD = "#B45309";
const CHIP_BG = "#EEF2FF";

const LOGO_URL =
  "https://res.cloudinary.com/zs5iyswh/image/upload/v1786101871/vedant-solutions-logo_pjqkb0.png";

let logoCache; // undefined = not tried, null = failed, Buffer = ok
async function getLogo() {
  if (logoCache !== undefined) return logoCache;
  try {
    const resp = await fetch(LOGO_URL);
    const buf = Buffer.from(await resp.arrayBuffer());
    logoCache = buf;
  } catch {
    logoCache = null;
  }
  return logoCache;
}

// ---- formatting helpers ----
const val = (v) => (v === null || v === undefined || v === "" ? "-" : String(v));
const money = (n) => (typeof n === "number" && n > 0 ? `Rs. ${n.toLocaleString("en-IN")}` : "-");
const roleLabel = (r) => (r === "sub-admin" ? "Sub-admin" : r === "admin" ? "Admin" : "Student");
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";
const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "-";
const isPremiumPlan = (p) => p && p !== "-" && p !== "Free";

export const generateUsersPdf = async (pdfData) => {
  const { metadata, users = [], statistics = {} } = pdfData;
  const logo = await getLogo();

  const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true });
  const buffers = [];
  doc.on("data", (c) => buffers.push(c));
  const finished = new Promise((resolve) => doc.on("end", () => resolve(Buffer.concat(buffers))));

  const M = 40;
  const pageW = doc.page.width;
  const contentW = pageW - M * 2;
  const rightX = pageW - M;
  const contentBottom = () => doc.page.height - M - 22; // leave room for footer

  let y = M;
  const newPage = () => { doc.addPage(); y = M; };
  const ensure = (h) => { if (y + h > contentBottom()) newPage(); };

  // ---- small drawing helpers ----
  const pill = (text, x, py, fill, color) => {
    doc.font("Helvetica-Bold").fontSize(8);
    const w = doc.widthOfString(text) + 12;
    doc.roundedRect(x, py, w, 15, 7).fill(fill);
    doc.fillColor(color).text(text, x + 6, py + 4, { lineBreak: false });
    return x + w + 5;
  };

  const kv = (label, value) => {
    ensure(14);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(MUTED).text(`${label}: `, M, y, { continued: true, lineBreak: false });
    doc.font("Helvetica").fillColor(INK).text(val(value), { lineBreak: false });
    y += 13;
  };

  const sectionLabel = (text) => {
    ensure(18);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(BRAND).text(text.toUpperCase(), M, y, { lineBreak: false });
    y += 14;
  };

  // Generic table (page-break aware). columns: [{key,label,width(frac),align,color(row)}]
  const drawTable = (columns, rows) => {
    const widths = columns.map((c) => c.width * contentW);
    const headerH = 18;
    const rowH = 16;

    const header = () => {
      doc.roundedRect(M, y, contentW, headerH, 2).fill(BRAND);
      let cx = M;
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor("#FFFFFF");
      columns.forEach((c, i) => {
        doc.text(c.label, cx + 5, y + 5, { width: widths[i] - 8, align: c.align || "left", lineBreak: false });
        cx += widths[i];
      });
      y += headerH;
    };

    ensure(headerH + rowH);
    header();
    rows.forEach((r, ri) => {
      if (y + rowH > contentBottom()) { newPage(); header(); }
      if (ri % 2 === 1) doc.rect(M, y, contentW, rowH).fill(ZEBRA);
      let cx = M;
      doc.font("Helvetica").fontSize(7.5);
      columns.forEach((c, i) => {
        const raw = r[c.key];
        const txt = raw === null || raw === undefined || raw === "" ? "-" : String(raw);
        doc.fillColor(c.color ? c.color(r) : INK).text(txt, cx + 5, y + 4, {
          width: widths[i] - 8, align: c.align || "left", lineBreak: false, ellipsis: true,
        });
        cx += widths[i];
      });
      y += rowH;
    });
    doc.moveTo(M, y).lineTo(rightX, y).lineWidth(0.5).strokeColor(LINE).stroke();
    y += 8;
  };

  // ---------------- COVER ----------------
  if (logo) doc.image(logo, M, y, { width: 150 });
  else doc.font("Helvetica-Bold").fontSize(20).fillColor(BRAND).text("Vedant Solutions", M, y);
  y += 42;

  doc.moveTo(M, y).lineTo(rightX, y).lineWidth(2).strokeColor(BRAND).stroke();
  y += 14;

  doc.font("Helvetica-Bold").fontSize(18).fillColor(INK).text("Users Export Report", M, y, { lineBreak: false });
  y += 26;

  doc.font("Helvetica").fontSize(9).fillColor(MUTED);
  doc.text(`Generated on: ${fmtDateTime(metadata?.generatedAt)}`, M, y, { lineBreak: false }); y += 13;
  doc.text(`Downloaded by: ${val(metadata?.downloadedBy)}`, M, y, { lineBreak: false }); y += 13;
  doc.text(`Total records: ${val(metadata?.totalRecords)}`, M, y, { lineBreak: false }); y += 18;

  // filter chips
  const filters = Object.entries(metadata?.appliedFilters || {})
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${v}`);
  if (filters.length) {
    sectionLabel("Applied Filters");
    let x = M;
    doc.font("Helvetica-Bold").fontSize(8);
    filters.forEach((f) => {
      const w = doc.widthOfString(f) + 14;
      if (x + w > rightX) { x = M; y += 20; }
      doc.roundedRect(x, y, w, 15, 7).fill(CHIP_BG);
      doc.fillColor(BRAND).text(f, x + 7, y + 4, { lineBreak: false });
      x += w + 6;
    });
    y += 24;
  }

  // stat tiles
  sectionLabel("Statistics");
  const tiles = [
    ["Total", statistics.totalUsers], ["Students", statistics.students],
    ["Admins", statistics.totalAdmins], ["Premium", statistics.premiumUsers],
    ["Free", statistics.freeUsers], ["Verified", statistics.verifiedUsers],
    ["Active", statistics.activeUsers], ["Inactive", statistics.inactiveUsers],
  ];
  const cols = 4, gap = 8, tw = (contentW - gap * (cols - 1)) / cols, th = 40;
  tiles.forEach((t, i) => {
    const x = M + (i % cols) * (tw + gap);
    const ty = y + Math.floor(i / cols) * (th + gap);
    doc.roundedRect(x, ty, tw, th, 6).fillAndStroke(ZEBRA, LINE);
    doc.font("Helvetica").fontSize(7).fillColor(MUTED).text(String(t[0]).toUpperCase(), x + 8, ty + 7, { lineBreak: false });
    doc.font("Helvetica-Bold").fontSize(15).fillColor(INK).text(String(t[1] ?? 0), x + 8, ty + 18, { lineBreak: false });
  });
  y += Math.ceil(tiles.length / cols) * (th + gap) + 6;

  // ---------------- SUMMARY TABLE ----------------
  sectionLabel("All Users — Summary");
  drawTable(
    [
      { key: "n", label: "#", width: 0.06, align: "left" },
      { key: "name", label: "Name", width: 0.26 },
      { key: "role", label: "Role", width: 0.13 },
      { key: "status", label: "Status", width: 0.11, color: (r) => (r.status === "Active" ? GREEN : RED) },
      { key: "plan", label: "Plan", width: 0.14 },
      { key: "predictions", label: "Predictions", width: 0.13, align: "right" },
      { key: "joined", label: "Joined", width: 0.17 },
    ],
    users.map((u, i) => ({
      n: i + 1,
      name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "-",
      role: roleLabel(u.role),
      status: u.status === "active" ? "Active" : "Inactive",
      plan: isPremiumPlan(u.plan) ? u.plan : "Free",
      predictions: u.predictionCount ?? 0,
      joined: fmtDate(u.joinedDate),
    })),
  );

  // ---------------- DETAILED CARDS ----------------
  y += 6;
  sectionLabel("User Details");
  y += 2;

  users.forEach((u, i) => {
    ensure(96);
    const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown";
    const active = u.status === "active";
    const premium = isPremiumPlan(u.plan);
    const student = u.role === "student";

    doc.font("Helvetica-Bold").fontSize(12).fillColor(INK).text(`${i + 1}. ${name}`, M, y, { width: contentW, lineBreak: false });
    y += 16;

    let px = M;
    px = pill(roleLabel(u.role), px, y, CHIP_BG, BRAND);
    px = pill(active ? "Active" : "Inactive", px, y, active ? "#DCFCE7" : "#FEE2E2", active ? GREEN : RED);
    px = pill(premium ? "Premium" : "Free", px, y, premium ? "#FEF3C7" : ZEBRA, premium ? GOLD : MUTED);
    if (u.isVerified) pill("Verified", px, y, "#E0F2FE", "#0369A1");
    y += 22;

    kv("Email", u.email);
    kv("Mobile", u.mobile);
    kv("Joined", fmtDate(u.joinedDate));
    kv("Last login", fmtDateTime(u.lastLogin));

    if (student) {
      y += 4; sectionLabel("Profile");
      kv("Gender", u.gender);
      kv("Location", [u.city, u.state].filter(Boolean).join(", ") || "-");
      kv("Budget", money(u.budget));
      kv("Preferred course", u.preferredCourseName);
      kv("Profile completed", u.profileCompleted ? "Yes" : "No");

      y += 4; sectionLabel("Usage");
      kv("Predictions", u.predictionCount ?? 0);
      kv("Saved colleges", (u.savedColleges || []).length);
      kv("Choice lists", (u.choiceLists || []).length);

      if ((u.predictionHistory || []).length) {
        y += 4; sectionLabel("Prediction History");
        drawTable(
          [
            { key: "course", label: "Course", width: 0.22 },
            { key: "counselling", label: "Counselling", width: 0.13 },
            { key: "state", label: "State", width: 0.15 },
            { key: "seat", label: "Seat Type", width: 0.2 },
            { key: "category", label: "Category", width: 0.13 },
            { key: "result", label: "S / M / R", width: 0.17, align: "right" },
          ],
          u.predictionHistory.map((h) => ({
            course: val(h.course),
            counselling: val(h.counsellingType),
            state: val(h.predictorState),
            seat: val(h.seatType),
            category: val(h.category),
            result: `${h.safeCount ?? 0} / ${h.moderateCount ?? 0} / ${h.riskyCount ?? 0}`,
          })),
        );
      }

      if ((u.savedColleges || []).length) {
        y += 4; sectionLabel("Saved Colleges");
        drawTable(
          [
            { key: "name", label: "College", width: 0.45 },
            { key: "city", label: "City", width: 0.2 },
            { key: "state", label: "State", width: 0.2 },
            { key: "ownership", label: "Ownership", width: 0.15 },
          ],
          u.savedColleges.map((c) => ({
            name: val(c.name), city: val(c.city), state: val(c.state), ownership: val(c.ownership),
          })),
        );
      }

      if ((u.choiceLists || []).length) {
        y += 4; sectionLabel("Choice Lists");
        drawTable(
          [
            { key: "name", label: "List", width: 0.5 },
            { key: "status", label: "Status", width: 0.25 },
            { key: "created", label: "Created", width: 0.25 },
          ],
          u.choiceLists.map((c) => ({
            name: val(c.name), status: val(c.status), created: fmtDate(c.createdAt),
          })),
        );
      }
    } else {
      y += 4;
      doc.font("Helvetica-Oblique").fontSize(9).fillColor(MUTED).text("Administrator account — student data not applicable.", M, y, { lineBreak: false });
      y += 14;
    }

    // divider between users
    y += 4;
    ensure(10);
    doc.moveTo(M, y).lineTo(rightX, y).lineWidth(0.5).strokeColor(LINE).stroke();
    y += 12;
  });

  // ---------------- FOOTERS (page numbers) ----------------
  const range = doc.bufferedPageRange();
  for (let p = range.start; p < range.start + range.count; p++) {
    doc.switchToPage(p);
    const fy = doc.page.height - 28;
    doc.font("Helvetica").fontSize(8).fillColor(MUTED);
    doc.text("Vedant Solutions · Users Export", M, fy, { lineBreak: false });
    doc.text(`Page ${p - range.start + 1} of ${range.count}`, M, fy, { width: contentW, align: "right", lineBreak: false });
  }

  doc.end();
  return finished;
};