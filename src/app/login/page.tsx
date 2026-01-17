"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/admin";

  const [email, setEmail] = useState("admin@local.dev");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErr("Sai email hoặc mật khẩu");
      return;
    }

    window.location.href = next;
  }

  return (
    <main className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Đăng nhập</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="border rounded w-full px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded w-full px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white rounded px-4 py-2 w-full">
          Login
        </button>

        {err && <p className="text-sm text-red-600">{err}</p>}
      </form>
    </main>
  );
}
