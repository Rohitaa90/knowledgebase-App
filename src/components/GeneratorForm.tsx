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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Content Type</label>
        <select name="templateType" required className="border rounded p-2">
          <option value="blog">Blog Post</option>
          <option value="caption">Social Caption</option>
          <option value="email">Email</option>
          <option value="product-description">Product Description</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Topic / Prompt</label>
        <textarea
          name="prompt"
          required
          rows={4}
          placeholder="e.g. benefits of remote work"
          className="border rounded p-2 resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tone (optional)</label>
        <select name="tone" className="border rounded p-2">
          <option value="">-- Select tone --</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="persuasive">Persuasive</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded p-2 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
