export type AdmissionPdfApplication = {
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  nationality: string;
  medium: string;
  applyingClass: string;
  previousInstitution: string;
  birthRegistrationNo: string;
  certificateName: string | null;
  certificateMimeType: string | null;
  fatherName: string;
  fatherNidNumber: string;
  fatherContactNumber: string;
  fatherOccupation: string;
  fatherNationality: string;
  fatherIsAlive: boolean;
  motherName: string;
  motherNidNumber: string;
  motherContactNumber: string;
  motherOccupation: string;
  motherNationality: string;
  motherIsAlive: boolean;
  presentAddress: string;
  permanentAddress: string;
  createdAt: Date;
  cycleName: string;
  guardians: Array<{
    name: string;
    relationship: string;
    nidNumber: string;
    contactNumber: string;
    occupation: string;
    nationality: string;
    isAlive: boolean;
  }>;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 42;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function pdfSafe(value: unknown) {
  return String(value ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "•")
    .replace(/[^\x20-\x7E\xA0-\xFF•]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function width(text: string, size: number) {
  return text.length * size * 0.48;
}

function wrap(value: string, size: number, maxWidth: number) {
  const words = String(value || "Not provided").trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (width(candidate, size) <= maxWidth) line = candidate;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : ["Not provided"];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function createAdmissionPdf(application: AdmissionPdfApplication): Uint8Array {
  // This PDF is deliberately designed as a compact, single-page A4 form.
  // Times-Roman is the PDF's built-in Times family and renders consistently
  // without requiring an external font package on the server.
  const commands: string[] = [];
  const yTop = PAGE_HEIGHT - 30;
  let y = yTop;

  const fill = (r: number, g: number, b: number) => commands.push(`${r} ${g} ${b} rg`);
  const stroke = (r: number, g: number, b: number) => commands.push(`${r} ${g} ${b} RG`);
  const rect = (x: number, yy: number, w: number, h: number, mode = "f") => commands.push(`${x} ${yy} ${w} ${h} re ${mode}`);
  const line = (x1: number, y1: number, x2: number, y2: number) => commands.push(`${x1} ${y1} m ${x2} ${y2} l S`);
  const text = (value: string, x: number, yy: number, size = 8.2, bold = false, color = "0.10 0.12 0.11") => {
    commands.push(`${color} rg`);
    commands.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${yy} Td (${pdfSafe(value)}) Tj ET`);
  };

  const section = (title: string) => {
    fill(0.94, 0.95, 0.92);
    rect(MARGIN, y - 22, CONTENT_WIDTH, 22);
    text(title.toUpperCase(), MARGIN + 10, y - 14.5, 8.6, true, "0.04 0.28 0.20");
    y -= 29;
  };

  const compactField = (x: number, w: number, label: string, value: string, size = 7.9) => {
    text(label, x, y - 8, 6.6, true, "0.34 0.37 0.35");
    const available = w - 6;
    const lines = wrap(value || "Not provided", size, available);
    text(lines[0]!, x, y - 19, size);
  };

  const row = (
    left: [string, string],
    right?: [string, string],
    leftFullWidth = false,
  ) => {
    const gap = 18;
    const colW = leftFullWidth ? CONTENT_WIDTH : (CONTENT_WIDTH - gap) / 2;
    compactField(MARGIN + 10, colW - 10, left[0], left[1]);
    if (!leftFullWidth && right) compactField(MARGIN + colW + gap, colW - 10, right[0], right[1]);
    stroke(0.84, 0.86, 0.84);
    commands.push("0.45 w");
    line(MARGIN + 8, y - 26, MARGIN + CONTENT_WIDTH - 8, y - 26);
    y -= 28;
  };

  // Header
  fill(0.07, 0.30, 0.21);
  rect(0, PAGE_HEIGHT - 78, PAGE_WIDTH, 78);
  text("K C MODEL SCHOOL & COLLEGE", MARGIN, PAGE_HEIGHT - 31, 17, true, "1 1 1");
  text("ADMISSION APPLICATION", MARGIN, PAGE_HEIGHT - 51, 9, true, "0.89 0.93 0.90");
  text(`Application date: ${formatDate(application.createdAt)}`, PAGE_WIDTH - MARGIN - 150, PAGE_HEIGHT - 51, 7.2, false, "0.89 0.93 0.90");
  y = PAGE_HEIGHT - 96;
  text(application.cycleName, MARGIN, y, 12.5, true, "0.07 0.30 0.21");
  text("Official applicant copy", PAGE_WIDTH - MARGIN - 105, y + 0.5, 7.2, false, "0.38 0.40 0.39");
  y -= 20;

  section("Student Information");
  row(["Full Name", application.fullName], ["Date of Birth", formatDate(application.dateOfBirth)]);
  row(["Gender", application.gender], ["Nationality", application.nationality]);
  row(["Medium", application.medium], ["Class Applying For", application.applyingClass]);
  row(["Previous Institution", application.previousInstitution || "Not provided"], ["Birth Registration No.", application.birthRegistrationNo]);
  row(["Certificate", application.certificateName || "Not provided"], ["Certificate Type", application.certificateMimeType || "Not provided"]);

  section("Parent / Guardian Information");
  row(["Father's Name", application.fatherName], ["Father's NID", application.fatherNidNumber]);
  row(["Father's Contact", application.fatherContactNumber || "Not provided"], ["Father's Occupation", application.fatherOccupation]);
  row(["Father's Nationality", application.fatherNationality], ["Father's Status", application.fatherIsAlive ? "Alive" : "Deceased"]);
  row(["Mother's Name", application.motherName], ["Mother's NID", application.motherNidNumber]);
  row(["Mother's Contact", application.motherContactNumber || "Not provided"], ["Mother's Occupation", application.motherOccupation]);
  row(["Mother's Nationality", application.motherNationality], ["Mother's Status", application.motherIsAlive ? "Alive" : "Deceased"]);

  section("Additional Guardians");
  if (!application.guardians.length) {
    row(["Status", "No additional guardian added"], undefined, true);
  } else {
    application.guardians.forEach((guardian, index) => {
      row([`Guardian ${index + 1}`, guardian.name], ["Relationship", guardian.relationship]);
      row(["NID Number", guardian.nidNumber], ["Contact Number", guardian.contactNumber || "Not provided"]);
      row(["Occupation", guardian.occupation], ["Nationality", guardian.nationality]);
      row(["Status", guardian.isAlive ? "Alive" : "Deceased"]);
    });
  }

  section("Address Information");
  row(["Present Address", application.presentAddress], undefined, true);
  row(["Permanent Address", application.permanentAddress], undefined, true);

  section("Declaration & Confirmation");
  const declaration = "I hereby declare that all information provided in this application is true, complete, and accurate to the best of my knowledge. I confirm that the documents and certificates submitted with this application are genuine and have not been altered, falsified, or misrepresented. I understand that providing false information or fraudulent documents may result in cancellation of the application or admission and may lead to further action according to the institution's rules.";
  const declarationLines = wrap(declaration, 7.6, CONTENT_WIDTH - 20);
  fill(0.975, 0.978, 0.973);
  const declarationHeight = Math.max(58, declarationLines.length * 10 + 18);
  rect(MARGIN, y - declarationHeight, CONTENT_WIDTH, declarationHeight);
  declarationLines.forEach((item, index) => text(item, MARGIN + 10, y - 13 - index * 10, 7.6));
  y -= declarationHeight + 8;
  fill(0.91, 0.95, 0.91);
  rect(MARGIN, y - 22, CONTENT_WIDTH, 22);
  text("Declaration confirmed by applicant", MARGIN + 10, y - 14.5, 8, true, "0.07 0.30 0.21");
  y -= 31;

  text("Applicant / Parent / Guardian Signature", MARGIN, y, 7.2, false, "0.34 0.37 0.35");
  stroke(0.15, 0.16, 0.15);
  commands.push("0.65 w");
  line(MARGIN, y - 15, MARGIN + 190, y - 15);
  text("For office use", PAGE_WIDTH - MARGIN - 120, y, 7.2, false, "0.34 0.37 0.35");
  stroke(0.84, 0.86, 0.84);
  rect(PAGE_WIDTH - MARGIN - 120, y - 42, 120, 32, "S");

  // Footer
  stroke(0.84, 0.86, 0.84);
  commands.push("0.5 w");
  line(MARGIN, 31, PAGE_WIDTH - MARGIN, 31);
  text("K C Model School & College - Admission Application", MARGIN, 18, 6.8, false, "0.37 0.40 0.38");
  const label = "Page 1 of 1";
  text(label, PAGE_WIDTH - MARGIN - width(label, 6.8), 18, 6.8, false, "0.37 0.40 0.38");

  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>";
  const content = commands.join("\n");
  objects[2] = "<< /Type /Pages /Kids [5 0 R] /Count 1 >>";
  objects[5] = "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents 6 0 R >>";
  objects[6] = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`;

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets: number[] = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = Buffer.byteLength(pdf, "latin1");
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objects.length; id += 1) pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Uint8Array(Buffer.from(pdf, "latin1"));
}
