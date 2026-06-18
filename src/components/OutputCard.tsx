"use client";

import { useState } from "react";

interface Props {
  output: string | null;
}

export default function OutputCard({ output }: Props) {
  const [copied, setCopied] = useState(false);

  if (!output) {
    return (
      <div className="border rounded p-4 text-gray-400 text-sm min-h-[200px] flex items-center justify-center">
        Your generated content will appear here.
      </div>
    );
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Generated Content</span>
        <button
          onClick={handleCopy}
          className="text-sm border rounded px-3 py-1 hover:bg-gray-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="whitespace-pre-wrap text-sm">{output}</p>
    </div>
  );
}
