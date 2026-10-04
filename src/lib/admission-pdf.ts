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
  const pages: string[][] = [];
  let commands: string[] = [];
  let y = PAGE_HEIGHT - MARGIN;

  const addPage = () => {
    commands = [];
    pages.push(commands);
    y = PAGE_HEIGHT - MARGIN;
  };

  const ensure = (height: number) => {
    if (y - height < 58) addPage();
  };

  const fill = (r: number, g: number, b: number) => commands.push(`${r} ${g} ${b} rg`);
  const stroke = (r: number, g: number, b: number) => commands.push(`${r} ${g} ${b} RG`);
  const rect = (x: number, yy: number, w: number, h: number, mode = "f") => commands.push(`${x} ${yy} ${w} ${h} re ${mode}`);
  const line = (x1: number, y1: number, x2: number, y2: number) => commands.push(`${x1} ${y1} m ${x2} ${y2} l S`);
  const text = (value: string, x: number, yy: number, size = 9, bold = false, color = "0.12 0.14 0.13") => {
    commands.push(`${color} rg`);
    commands.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${yy} Td (${pdfSafe(value)}) Tj ET`);
  };

  addPage();

  // Professional header
  fill(0.07, 0.30, 0.21);
  rect(0, PAGE_HEIGHT - 112, PAGE_WIDTH, 112);
  text("K C MODEL SCHOOL & COLLEGE", MARGIN, PAGE_HEIGHT - 47, 18, true, "1 1 1");
  text("ADMISSION APPLICATION", MARGIN, PAGE_HEIGHT - 70, 10, true, "0.88 0.92 0.89");
  text("House 275, Prembagan Road, Khilgaon, Dhaka-1230", MARGIN, PAGE_HEIGHT - 90, 7.8, false, "0.91 0.93 0.91");
  text(`Application date: ${formatDate(application.createdAt)}`, PAGE_WIDTH - MARGIN - 168, PAGE_HEIGHT - 90, 7.8, false, "0.91 0.93 0.91");
  y = PAGE_HEIGHT - 142;
  text(application.cycleName, MARGIN, y, 15, true, "0.07 0.30 0.21");
  y -= 18;
  text("Official applicant copy", MARGIN, y, 8.5, false, "0.37 0.40 0.38");
  y -= 30;

  const heading = (title: string) => {
    ensure(45);
    fill(0.95, 0.96, 0.94);
    rect(MARGIN, y - 28, CONTENT_WIDTH, 28);
    text(title.toUpperCase(), MARGIN + 10, y - 18, 8.8, true, "0.07 0.30 0.21");
    y -= 43;
  };

  const field = (label: string, value: string, full = false) => {
    const valueX = full ? MARGIN + 10 : MARGIN + 142;
    const max = full ? CONTENT_WIDTH - 20 : CONTENT_WIDTH - 152;
    const lines = wrap(value || "Not provided", 9.2, max);
    const h = Math.max(25, lines.length * 13 + 9);
    ensure(h + 2);
    text(label, MARGIN + 10, y - 14, 8.2, true, "0.37 0.40 0.38");
    lines.forEach((item, index) => text(item, valueX, y - 14 - index * 13, 9.2));
    stroke(0.84, 0.86, 0.84);
    commands.push("0.5 w");
    line(MARGIN, y - h, MARGIN + CONTENT_WIDTH, y - h);
    y -= h;
  };

  heading("Student Information");
  field("Full Name", application.fullName);
  field("Date of Birth", formatDate(application.dateOfBirth));
  field("Gender", application.gender);
  field("Nationality", application.nationality);
  field("Medium", application.medium);
  field("Class Applying For", application.applyingClass);
  field("Previous Institution", application.previousInstitution || "Not provided");
  field("Birth Registration No.", application.birthRegistrationNo);
  field("Certificate", `${application.certificateName || "Not provided"} (${application.certificateMimeType || "unknown type"})`);

  heading("Father's Information");
  field("Name", application.fatherName);
  field("NID Number", application.fatherNidNumber);
  field("Contact Number", application.fatherContactNumber || "Not provided");
  field("Occupation", application.fatherOccupation);
  field("Nationality", application.fatherNationality);
  field("Status", application.fatherIsAlive ? "Alive" : "Deceased");

  heading("Mother's Information");
  field("Name", application.motherName);
  field("NID Number", application.motherNidNumber);
  field("Contact Number", application.motherContactNumber || "Not provided");
  field("Occupation", application.motherOccupation);
  field("Nationality", application.motherNationality);
  field("Status", application.motherIsAlive ? "Alive" : "Deceased");

  heading("Additional Guardians");
  if (!application.guardians.length) field("Guardians", "None added", true);
  application.guardians.forEach((guardian, index) => {
    ensure(28);
    text(`Guardian ${index + 1}`, MARGIN + 10, y, 9.5, true, "0.55 0.42 0.16");
    y -= 19;
    field("Name", guardian.name);
    field("Relationship", guardian.relationship);
    field("NID Number", guardian.nidNumber);
    field("Contact Number", guardian.contactNumber || "Not provided");
    field("Occupation", guardian.occupation);
    field("Nationality", guardian.nationality);
    field("Status", guardian.isAlive ? "Alive" : "Deceased");
    y -= 6;
  });

  heading("Address Information");
  field("Present Address", application.presentAddress, true);
  field("Permanent Address", application.permanentAddress, true);

  heading("Declaration & Confirmation");
  const declaration = "I hereby declare that all information provided in this application is true, complete, and accurate to the best of my knowledge. I confirm that the documents and certificates submitted with this application are genuine and have not been altered, falsified, or misrepresented. I understand that providing false information or fraudulent documents may result in cancellation of the application or admission and may lead to further action according to the institution's rules.";
  const declarationLines = wrap(declaration, 9.1, CONTENT_WIDTH - 20);
  const declarationHeight = declarationLines.length * 13 + 34;
  ensure(declarationHeight + 50);
  fill(0.975, 0.978, 0.973);
  rect(MARGIN, y - declarationHeight, CONTENT_WIDTH, declarationHeight);
  declarationLines.forEach((item, index) => text(item, MARGIN + 10, y - 17 - index * 13, 9.1));
  y -= declarationHeight + 12;
  fill(0.91, 0.95, 0.91);
  rect(MARGIN, y - 26, CONTENT_WIDTH, 26);
  text("Declaration confirmed by applicant", MARGIN + 10, y - 17, 9, true, "0.07 0.30 0.21");
  y -= 47;

  ensure(75);
  text("Applicant / Parent / Guardian Signature", MARGIN, y, 8, false, "0.37 0.40 0.38");
  stroke(0.15, 0.16, 0.15);
  commands.push("0.7 w");
  line(MARGIN, y - 18, MARGIN + 210, y - 18);
  text("For office use", PAGE_WIDTH - MARGIN - 130, y, 8, false, "0.37 0.40 0.38");
  stroke(0.84, 0.86, 0.84);
  commands.push("0.7 w");
  rect(PAGE_WIDTH - MARGIN - 130, y - 48, 130, 38, "S");

  // Footer is added to each page after pagination is complete.
  const total = pages.length;
  pages.forEach((pageCommands, index) => {
    pageCommands.push("0.84 0.86 0.84 RG", "0.5 w", `${MARGIN} 32 m ${PAGE_WIDTH - MARGIN} 32 l S`);
    pageCommands.push("0.37 0.40 0.38 rg");
    pageCommands.push(`BT /F1 7.5 Tf ${MARGIN} 18 Td (K C Model School & College - Admission Application) Tj ET`);
    const label = `Page ${index + 1} of ${total}`;
    pageCommands.push(`BT /F1 7.5 Tf ${PAGE_WIDTH - MARGIN - width(label, 7.5)} 18 Td (${pdfSafe(label)}) Tj ET`);
  });

  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const pageIds: number[] = [];
  const contentIds: number[] = [];
  let nextId = 5;
  for (let i = 0; i < pages.length; i += 1) {
    pageIds.push(nextId);
    contentIds.push(nextId + 1);
    nextId += 2;
  }
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  pages.forEach((pageCommands, index) => {
    const content = pageCommands.join("\n");
    const pageId = pageIds[index]!;
    const contentId = contentIds[index]!;
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`;
  });

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
