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
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">AI Content Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GeneratorForm onResult={handleResult} />
        <OutputCard output={output} />
      </div>
    </main>
  );
}
