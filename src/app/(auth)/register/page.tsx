import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
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
          <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
          <p className="text-sm text-slate-500">Get started for free</p>
        </div>
        <RegisterForm />
        <p className="text-sm text-center text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
