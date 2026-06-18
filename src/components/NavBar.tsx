"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavBar({ name }: { name: string }) {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="font-bold text-base text-slate-900 tracking-tight">✦ AI Content Generator</span>
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-teal-600 font-medium transition-colors">
            Generate
          </Link>
          <Link href="/dashboard/history" className="text-sm text-slate-600 hover:text-teal-600 font-medium transition-colors">
            History
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400 hidden sm:block">{name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm border border-slate-300 text-slate-600 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
