"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" required className="border p-2 rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded">Login</button>
        <a href="/register" className="text-sm text-center text-blue-500">Don't have an account? Register</a>
      </form>
    </div>
  );
}
