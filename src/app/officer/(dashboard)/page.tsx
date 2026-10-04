import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireOfficer } from "@/lib/session";
import { APPLICATION_STATUS_LABELS } from "@/lib/admissions";

export default async function OfficerOverviewPage() {
  const officer = await requireOfficer();
  const [mine, underReview, awaiting, eligible, notEligible, examEligible, examCompleted, total] = await Promise.all([
    prisma.admissionApplication.count({}),
    prisma.admissionApplication.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.admissionApplication.count({ where: { status: "AWAITING_APPLICANT" } }),
    prisma.admissionApplication.count({ where: { status: "ELIGIBLE" } }),
    prisma.admissionApplication.count({ where: { status: "NOT_ELIGIBLE" } }),
    prisma.admissionApplication.count({ where: { status: "EXAM_ELIGIBLE" } }),
    prisma.admissionApplication.count({ where: { status: "EXAM_COMPLETED" } }),
    prisma.admissionApplication.count({})
  ]);
  const cards = [
    { label: "My applications", value: mine, href: "/officer/applications" },
    { label: APPLICATION_STATUS_LABELS.UNDER_REVIEW, value: underReview, href: "/officer/applications?status=UNDER_REVIEW" },
    { label: APPLICATION_STATUS_LABELS.AWAITING_APPLICANT, value: awaiting, href: "/officer/applications?status=AWAITING_APPLICANT" },
    { label: APPLICATION_STATUS_LABELS.ELIGIBLE, value: eligible, href: "/officer/applications?status=ELIGIBLE" },
    { label: APPLICATION_STATUS_LABELS.NOT_ELIGIBLE, value: notEligible, href: "/officer/applications?status=NOT_ELIGIBLE" },
    { label: APPLICATION_STATUS_LABELS.EXAM_ELIGIBLE, value: examEligible, href: "/officer/applications?status=EXAM_ELIGIBLE" },
    { label: APPLICATION_STATUS_LABELS.EXAM_COMPLETED, value: examCompleted, href: "/officer/applications?status=EXAM_COMPLETED" },
    { label: "All applications", value: total, href: "/officer/applications" },
  ];
  return <div className="max-w-[1200px]"><header className="border-b border-[#d9d8cf] pb-7"><p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#176b45]">Admissions</p><h1 className="mt-2 font-heading text-3xl font-normal text-[#124c36]">Officer dashboard</h1><p className="mt-2 text-sm leading-6 text-[#69716b]">All submitted applications are available to admission officers for review and processing.</p></header><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{cards.map(c=><Link key={c.label} href={c.href} className="rounded-[14px] border border-[#d9d8cf] bg-[#fffdf8] p-5 hover:border-[#176b45]"><p className="text-[9px] font-medium uppercase tracking-[.14em] text-[#8a918b]">{c.label}</p><p className="mt-2 font-heading text-2xl text-[#124c36]">{c.value}</p></Link>)}</div></div>;
}
