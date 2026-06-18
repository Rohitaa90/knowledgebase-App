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

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (items.length === 0) return <p className="text-sm text-gray-500">No generations yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {deleteError && (
        <p className="bg-red-50 border border-red-300 text-red-600 text-sm rounded p-3">{deleteError}</p>
      )}
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.id} className="border rounded p-4 flex flex-col gap-2">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase text-gray-500">{item.templateType}</span>
                {item.tone && <span className="text-xs text-gray-400 ml-2">· {item.tone}</span>}
                <p className="text-sm font-medium mt-1 truncate">{item.prompt}</p>
                <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-500 hover:underline shrink-0"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              className="text-xs text-blue-500 hover:underline self-start"
            >
              {expanded === item.id ? "Hide output" : "Show output"}
            </button>
            {expanded === item.id && (
              <p className="text-sm whitespace-pre-wrap border-t pt-2">{item.output}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
