import Table from "./Component/Table/Table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto px-4">
        <Table />
      </div>
    </main>
  );
}
