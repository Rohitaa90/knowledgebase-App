"use client";

import { useState } from "react";

interface Props {
  output: string | null;
}

function renderLines(lines: string[]) {
  return lines.map((line, i) => {
    if (line.startsWith("## "))
      return <h2 key={i} className="text-base font-bold text-slate-800 mt-2">{line.replace(/^## /, "")}</h2>;
    if (line.startsWith("# "))
      return <h1 key={i} className="text-lg font-bold text-slate-900 mt-1">{line.replace(/^# /, "")}</h1>;
    if (line.startsWith("**") && line.endsWith("**"))
      return <p key={i} className="text-sm font-semibold text-slate-800">{line.replace(/\*\*/g, "")}</p>;
    if (line.startsWith("- ") || line.startsWith("* "))
      return (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-teal-500 mt-1 text-xs">●</span>
          <p className="text-sm text-slate-700 leading-relaxed">{line.replace(/^[-*] /, "")}</p>
        </div>
      );
    return <p key={i} className="text-sm text-slate-700 leading-relaxed">{line}</p>;
  });
}

export default function OutputCard({ output }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!output) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-lg">✦</div>
        <p className="text-slate-500 text-sm font-medium">No content yet</p>
        <p className="text-slate-400 text-xs">Fill in the form and click Generate</p>
      </div>
    );
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const lines = output.split("\n").filter((l) => l.trim() !== "");

  const Header = ({ onExpand }: { onExpand: () => void }) => (
    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
        <span className="text-sm font-semibold text-slate-700">Generated Content</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="text-xs border border-slate-300 text-slate-600 rounded-lg px-3 py-1.5 hover:bg-white transition-colors font-medium"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
        <button
          onClick={onExpand}
          title="Expand"
          className="text-xs border border-slate-300 text-slate-600 rounded-lg px-2.5 py-1.5 hover:bg-white transition-colors"
        >
          ⛶
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <Header onExpand={() => setExpanded(true)} />
        <div className="px-6 py-5 overflow-y-auto overscroll-contain max-h-[520px] flex flex-col gap-3">
          {renderLines(lines)}
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
                <span className="text-sm font-semibold text-slate-700">Generated Content</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-xs border border-slate-300 text-slate-600 rounded-lg px-3 py-1.5 hover:bg-white transition-colors font-medium"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-xs border border-slate-300 text-slate-600 rounded-lg px-2.5 py-1.5 hover:bg-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="px-8 py-6 overflow-y-auto overscroll-contain flex flex-col gap-3">
              {renderLines(lines)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
