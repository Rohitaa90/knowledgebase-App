"use client";

import { useState } from "react";

interface Props {
  onResult: (id: string, output: string) => void;
}

export default function GeneratorForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateType: form.get("templateType"),
          prompt: form.get("prompt"),
          tone: form.get("tone") || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      onResult(data.id, data.output);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-800">Configure generation</h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Content Type</label>
        <select
          name="templateType"
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-800"
        >
          <option value="blog">Blog Post</option>
          <option value="caption">Social Caption</option>
          <option value="email">Email</option>
          <option value="product-description">Product Description</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Topic / Prompt</label>
        <textarea
          name="prompt"
          required
          rows={4}
          placeholder="e.g. benefits of remote work"
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Tone <span className="text-slate-400 font-normal">(optional)</span></label>
        <select
          name="tone"
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-800"
        >
          <option value="">Select a tone</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="persuasive">Persuasive</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
