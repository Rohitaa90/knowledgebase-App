"use client";

import { useState } from "react";

interface Props {
  output: string | null;
}

export default function OutputCard({ output }: Props) {
  const [copied, setCopied] = useState(false);

  if (!output) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-slate-400 text-sm">Your generated content will appear here.</p>
      </div>
    );
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-base font-semibold text-slate-800">Generated Content</span>
        <button
          onClick={handleCopy}
          className="text-xs border border-slate-300 text-slate-600 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <div className="border-t border-slate-100 pt-4">
        <p className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">{output}</p>
      </div>
    </div>
  );
}
