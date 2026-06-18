import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className="auth-bg min-h-screen flex flex-col items-center justify-center px-4 gap-8">
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl font-bold text-teal-600 tracking-tight">✦ AI Content Generator</span>
        <p className="text-sm text-slate-500">Turn your ideas into polished content instantly</p>
      </div>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-slate-200 p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>
        <LoginForm />
        <p className="text-sm text-center text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-teal-600 font-medium hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
