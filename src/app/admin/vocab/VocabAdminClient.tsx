"use client";

import { useEffect, useState } from "react";

type Vocab = {
  id: string;
  word: string;
  reading: string | null;
  meaningVi: string;
  createdAt: string;
};

export default function VocabAdminClient() {
  const [items, setItems] = useState<Vocab[]>([]);
  const [loading, setLoading] = useState(true);

  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");
  const [meaningVi, setMeaningVi] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function loadVocab() {
      setLoading(true);
      const res = await fetch("/api/vocab", { cache: "no-store" });
      const json = await res.json();
      setItems(json.data ?? []);
      setLoading(false);
    }
    loadVocab();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/vocab", { cache: "no-store" });
    const json = await res.json();
    setItems(json.data ?? []);
    setLoading(false);
  }

  async function addVocab(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSaving(true);

    const res = await fetch("/api/vocab", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, reading, meaningVi }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setErr(json.error ?? `Thêm thất bại (${res.status})`);
      setSaving(false);
      return;
    }

    setWord("");
    setReading("");
    setMeaningVi("");
    setSaving(false);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Xoá từ này?")) return;

    setErr(null);
    const res = await fetch(`/api/vocab/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setErr(json.error ?? `Xoá thất bại (${res.status})`);
      return;
    }

    await load();
  }

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Từ vựng</h1>
        <p className="text-sm text-gray-500">
          {loading ? "Đang tải..." : `Tổng: ${items.length}`}
        </p>
      </header>

      <section className="rounded border p-4 space-y-3">
        <h2 className="font-medium">Thêm từ mới</h2>

        <form onSubmit={addVocab} className="grid gap-3 md:grid-cols-3">
          <input className="border rounded px-3 py-2" placeholder="Từ (日本)"
            value={word} onChange={(e) => setWord(e.target.value)} required />

          <input className="border rounded px-3 py-2" placeholder="Cách đọc (にほん)"
            value={reading} onChange={(e) => setReading(e.target.value)} />

          <input className="border rounded px-3 py-2" placeholder="Nghĩa (Nhật Bản)"
            value={meaningVi} onChange={(e) => setMeaningVi(e.target.value)} required />

          <div className="md:col-span-3 flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Đang lưu..." : "Thêm"}
            </button>
            {err && <span className="text-sm text-red-500">{err}</span>}
          </div>
        </form>
      </section>

      <section className="grid gap-3">
        {items.map((v) => (
          <div key={v.id} className="rounded border p-4 flex items-start justify-between">
            <div>
              <div className="text-xl">
                {v.word}{" "}
                <span className="text-sm text-gray-500">{v.reading ?? ""}</span>
              </div>
              <div className="mt-1">{v.meaningVi}</div>
            </div>

            <button onClick={() => remove(v.id)} className="text-sm text-red-600 hover:underline">
              Xoá
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
