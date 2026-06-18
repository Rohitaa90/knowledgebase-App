"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="bg-red-50 border border-red-300 text-red-600 text-sm rounded p-3">{error}</p>}
      <input name="email" type="email" placeholder="Email" required className="border rounded p-2 w-full" />
      <input name="password" type="password" placeholder="Password" required className="border rounded p-2 w-full" />
      <button type="submit" disabled={loading} className="bg-black text-white rounded p-2 disabled:opacity-50">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
