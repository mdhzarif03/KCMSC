import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/db";
import { AlumniExperienceDialog } from "./AlumniExperienceDialog";

export default async function AlumniPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const bn = locale === "bn";
  const messages = await prisma.alumniMessage.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  const copy = bn ? { kicker: "প্রাক্তন শিক্ষার্থী", title: "যাঁরা কেসিএমএসসি থেকে শুরু করেছিলেন, তাঁদের কিছু কথা।", intro: "বিদ্যালয়ের সঙ্গে সম্পর্ক শুধু একটি নির্দিষ্ট সময়ের মধ্যে সীমাবদ্ধ নয়। প্রাক্তন শিক্ষার্থীদের স্মৃতি, অভিজ্ঞতা ও শুভকামনাও এই প্রতিষ্ঠানের পথচলার অংশ।", empty: "প্রাক্তন শিক্ষার্থীদের বার্তা শিগগিরই এখানে প্রকাশ করা হবে।", year: "ব্যাচ", back: "হোমে ফিরুন" } : { kicker: "Alumni", title: "A few words from those who started here.", intro: "A school relationship does not end with the last day of class. Alumni memories, experiences and good wishes remain part of the institution's story.", empty: "Alumni messages will be published here soon.", year: "Class of", back: "Back home" };
  return <main className="bg-[#f7f5ef] text-[#242824]">
    <section className="border-b border-[#d9d8cf] bg-[#fffdf8]"><div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><span className="kc-classic-kicker">{copy.kicker}</span><h1 className="mt-5 max-w-4xl font-heading text-[clamp(2.8rem,6vw,6rem)] leading-[.9] tracking-[-.05em] text-[#124c36]">{copy.title}</h1><p className="mt-8 max-w-2xl text-[15px] leading-7 text-[#69716b] sm:text-base">{copy.intro}</p></div></section>
    <section className="kc-classic-section bg-[#f7f5ef]"><div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
      {messages.length === 0 ? <div className="border-y border-[#d9d8cf] py-20 text-center text-sm text-[#69716b]">{copy.empty}</div> : <div className="divide-y divide-[#d9d8cf] border-y border-[#d9d8cf]">{messages.map((message) => { const name = bn ? message.nameBn : message.nameEn; const text = bn ? message.messageBn : message.messageEn; const role = bn ? message.roleBn : message.roleEn; const organization = bn ? message.organizationBn : message.organizationEn; return <article key={message.id} className="grid gap-8 py-10 lg:grid-cols-[190px_1fr] lg:gap-12 lg:py-14"><div className="flex items-start gap-4 lg:block">{message.photoUrl ? <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#e5e2d8]"><img src={message.photoUrl} alt={name} className="h-full w-full object-cover" /></div> : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#176b45] font-heading text-xl text-white">{name.trim().charAt(0)}</div>}<div className="lg:mt-5"><p className="font-heading text-xl text-[#124c36]">{name}</p><p className="mt-1 text-xs leading-5 text-[#69716b]">{[role, organization].filter(Boolean).join(" · ")}</p>{message.graduationYear ? <p className="mt-2 text-[9px] uppercase tracking-[.16em] text-[#b59a4a]">{copy.year} {message.graduationYear}</p> : null}</div></div><div><span className="font-heading text-5xl leading-none text-[#b59a4a]">“</span><AlumniExperienceDialog text={text} bn={bn} /></div></article>; })}</div>}
      <div className="mt-8"><Link href={`/${locale}`} className="kc-classic-link">{copy.back}<span>↗</span></Link></div>
    </div></section>
  </main>;
}
