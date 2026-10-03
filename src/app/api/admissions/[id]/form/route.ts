import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/session";
import { verifyApplicationDownloadToken } from "@/lib/admission-download";

const esc = (v: unknown) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin();
  const token = new URL(request.url).searchParams.get("token");
  if (!admin && (!token || !verifyApplicationDownloadToken(params.id, token))) return new NextResponse("Unauthorized", { status: 401 });
  const a = await prisma.admissionApplication.findUnique({
    where: { id: params.id },
    include: { cycle: true, guardians: true }
  });
  if (!a) return new NextResponse("Not found", { status: 404 });

  const fields: Array<[string, string]> = [
    ["Full Name", a.fullName], ["Date of Birth", a.dateOfBirth.toLocaleDateString()], ["Gender", a.gender],
    ["Nationality", a.nationality], ["Medium", a.medium], ["Class", a.applyingClass],
    ["Previous Institution", a.previousInstitution], ["Birth Registration No.", a.birthRegistrationNo],
    ["Father's Name", a.fatherName], ["Father's NID Number", a.fatherNidNumber], ["Father's Contact Number", a.fatherContactNumber],
    ["Father's Occupation", a.fatherOccupation], ["Father's Nationality", a.fatherNationality], ["Father's Status", a.fatherIsAlive ? "Alive" : "Deceased"],
    ["Mother's Name", a.motherName], ["Mother's NID Number", a.motherNidNumber], ["Mother's Contact Number", a.motherContactNumber],
    ["Mother's Occupation", a.motherOccupation], ["Mother's Nationality", a.motherNationality], ["Mother's Status", a.motherIsAlive ? "Alive" : "Deceased"],
    ["Present Address", a.presentAddress], ["Permanent Address", a.permanentAddress]
  ];

  const extra = a.guardians.map((g, i) => `
    <h2>Additional Guardian ${i + 1}</h2>
    ${[["Name", g.name], ["Relationship", g.relationship], ["NID Number", g.nidNumber], ["Contact Number", g.contactNumber], ["Occupation", g.occupation], ["Nationality", g.nationality], ["Status", g.isAlive ? "Alive" : "Deceased"]]
      .map(([l, v]) => `<p><b>${esc(l)}:</b> ${esc(v)}</p>`).join("")}
  `).join("");

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>KCMSC Admission Application</title><style>body{font-family:Arial,sans-serif;margin:40px;color:#242824}h1{color:#124c36}h2{border-bottom:1px solid #d9d8cf;padding-bottom:5px;margin-top:25px}p{margin:8px 0}@media print{body{margin:18mm}}</style></head><body><h1>K C Model School & College</h1><p>Admission Application Form</p><p><b>Cycle:</b> ${esc(a.cycle.nameEn)}</p><h2>Student and Family Information</h2>${fields.map(([l, v]) => `<p><b>${esc(l)}:</b> ${esc(v)}</p>`).join("")}${extra}</body></html>`;
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="KCMSC-Admission-Application.html"`
    }
  });
}
