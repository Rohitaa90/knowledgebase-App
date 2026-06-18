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
      {error && <p className="bg-red-50 border border-red-300 text-red-600 text-sm rounded p-3">{error}</p>}
      <input name="name" type="text" placeholder="Name" required className="border rounded p-2 w-full" />
      <input name="email" type="email" placeholder="Email" required className="border rounded p-2 w-full" />
      <input name="password" type="password" placeholder="Password" required className="border rounded p-2 w-full" />
      <button type="submit" disabled={loading} className="bg-black text-white rounded p-2 disabled:opacity-50">
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
