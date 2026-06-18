"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavBar({ name }: { name: string }) {
  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">AI Content Generator</span>
        <Link href="/dashboard" className="text-sm hover:underline">Generate</Link>
        <Link href="/dashboard/history" className="text-sm hover:underline">History</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 hidden sm:block">{name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm border rounded px-3 py-1 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
