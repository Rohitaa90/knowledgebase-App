"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full placeholder:text-slate-400"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full placeholder:text-slate-400"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
