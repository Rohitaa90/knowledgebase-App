"use client";

import { useEffect, useState } from "react";

interface Generation {
  id: string;
  templateType: string;
  prompt: string;
  tone: string | null;
  output: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  blog: "Blog Post",
  caption: "Social Caption",
  email: "Email",
  "product-description": "Product Description",
};

export default function HistoryList() {
  const [items, setItems] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    setDeleteError("");
    const res = await fetch(`/api/history/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setDeleteError("Failed to delete. Please try again.");
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (loading) return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-400">
      Loading your history...
    </div>
  );

  if (items.length === 0) return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-2">
      <p className="text-slate-500 font-medium">No generations yet</p>
      <p className="text-slate-400 text-sm">Head to Generate to create your first piece of content.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {deleteError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {deleteError}
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">
                    {typeLabels[item.templateType] ?? item.templateType}
                  </span>
                  {item.tone && (
                    <span className="text-xs text-slate-400 capitalize">{item.tone}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{item.prompt}</p>
                <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-2.5 py-1 shrink-0 transition-colors"
              >
                Delete
              </button>
            </div>

            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              className="text-xs text-teal-600 hover:underline self-start font-medium"
            >
              {expanded === item.id ? "Hide output ↑" : "Show output ↓"}
            </button>

            {expanded === item.id && (
              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm whitespace-pre-wrap text-slate-700 leading-relaxed">{item.output}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
