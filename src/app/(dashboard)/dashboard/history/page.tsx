import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Generation History</h1>
        <p className="text-sm text-slate-500 mt-1">All your past generations, newest first.</p>
      </div>
      <HistoryList />
    </main>
  );
}
