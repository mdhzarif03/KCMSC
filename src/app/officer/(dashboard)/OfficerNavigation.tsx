"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiCalendar, FiChevronRight, FiClipboard, FiGrid, FiSettings, FiX } from "react-icons/fi";
import { SignOutButton } from "../../admin/(dashboard)/SignOutButton";

const NAV = [
  { href: "/officer", label: "Dashboard", icon: FiGrid },
  { href: "/officer/applications", label: "Applications", icon: FiClipboard },
  { href: "/officer/cycles", label: "Admission Cycles", icon: FiCalendar },
  { href: "/officer/settings", label: "My Account", icon: FiSettings },
];

function active(pathname: string, href: string) {
  return href === "/officer" ? pathname === "/officer" : pathname === href || pathname.startsWith(`${href}/`);
}

export function OfficerNavigation({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#e1dfd6] px-5 py-5">
        <Link href="/officer" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[3px] bg-[#176b45] font-heading text-sm text-white shadow-sm">KC</span>
          <span>
            <span className="block font-heading text-[17px] leading-tight text-[#124c36]">K C Model School</span>
            <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.2em] text-[#89918a]">Admissions Desk</span>
          </span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-5">
        <p className="px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9a9f9a]">Workspace</p>
        <div className="mt-2 space-y-1">
          {NAV.map((item) => {
            const isOn = active(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[12px] transition-all ${isOn ? "bg-[#176b45] font-medium text-white shadow-[0_6px_18px_rgba(23,107,69,0.16)]" : "text-[#59615b] hover:bg-[#f0eee7] hover:text-[#124c36]"}`}>
                <Icon className={`h-[15px] w-[15px] ${isOn ? "text-white" : "text-[#858d86]"}`} />
                <span className="flex-1">{item.label}</span>
                <FiChevronRight className={`h-3.5 w-3.5 ${isOn ? "opacity-80" : "opacity-0 group-hover:opacity-50"}`} />
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="border-t border-[#e1dfd6] p-4">
        <div className="mb-3 rounded-[10px] border border-[#e1dfd6] bg-[#f3f1e9] px-3 py-3">
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#176b45]">Signed in as</p>
          <p className="mt-1.5 truncate text-[11px] text-[#59615b]" title={email}>{email}</p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[258px] border-r border-[#e1dfd6] bg-[#fffdf8] lg:block">{content}</aside>
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#e1dfd6] bg-[#fffdf8]/95 px-4 shadow-sm backdrop-blur lg:hidden">
        <Link href="/officer" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[3px] bg-[#176b45] font-heading text-xs text-white">KC</span>
          <span className="font-heading text-[16px] text-[#124c36]">Admissions Desk</span>
        </Link>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation" className="grid h-9 w-9 place-items-center rounded-[9px] border border-[#d9d8cf] text-[#176b45]">
          <span className="text-lg leading-none">☰</span>
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="absolute inset-0 bg-[#124c36]/35" />
          <aside className="absolute inset-y-0 left-0 w-[290px] bg-[#fffdf8] shadow-2xl">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation" className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-[9px] border border-[#d9d8cf] text-[#5e665f]"><FiX className="h-4 w-4" /></button>
            {content}
          </aside>
        </div>
      ) : null}
    </>
  );
}
