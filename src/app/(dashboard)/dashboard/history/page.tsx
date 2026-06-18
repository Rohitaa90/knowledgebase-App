import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Generation History</h1>
      <HistoryList />
    </main>
  );
}
