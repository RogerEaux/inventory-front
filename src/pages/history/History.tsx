import HistoryTable from './history-table/HistoryTable';

export default function History() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <h1 className="mt-5 p-16 text-3xl font-bold text-nowrap max-sm:text-2xl">
          History
        </h1>
        <HistoryTable />
      </section>
    </main>
  );
}
