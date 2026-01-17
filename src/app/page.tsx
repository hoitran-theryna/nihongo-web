import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Nihongo Web</h1>
      <Link className="underline" href="/learn/vocab">
        Vào học từ vựng
      </Link>
    </main>
  );
}
