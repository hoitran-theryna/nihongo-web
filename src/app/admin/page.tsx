export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const vocabCount = await prisma.vocab.count();
  const userCount = await prisma.user.count();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <ul className="list-disc pl-5">
        <li>Users: {userCount}</li>
        <li>Vocab: {vocabCount}</li>
      </ul>
    </div>
  );
}
