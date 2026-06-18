"use client";

import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import OutputCard from "@/components/OutputCard";

export default function DashboardPage() {
  const [output, setOutput] = useState<string | null>(null);

  function handleResult(_id: string, text: string) {
    setOutput(text);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Generate Content</h1>
        <p className="text-sm text-slate-500 mt-1">Fill in the form and let AI write for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <GeneratorForm onResult={handleResult} />
        <OutputCard output={output} />
      </div>
    </main>
  );
}
