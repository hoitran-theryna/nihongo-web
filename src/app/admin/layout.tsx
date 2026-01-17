export const runtime = "nodejs";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LogoutButton from "@/components/LogoutButton";

interface UserWithRole {
  email?: string | null;
  role?: string;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Chưa login -> đá về /login
  if (!session?.user) {
    redirect("/login?next=/admin");
  }

  const role = (session.user as UserWithRole).role;

  // Sai quyền -> 403
  if (role !== "ADMIN" && role !== "EDITOR") {
    redirect("/403");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="p-4 flex items-center justify-between">
          <div className="font-semibold">Admin</div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {session.user.email} ({role})
            </span>
            <LogoutButton />
          </div>
        </div>

        <nav className="px-4 pb-4 flex gap-4 text-sm">
          <Link className="underline" href="/admin">Dashboard</Link>
          <Link className="underline" href="/admin/vocab">Manage Vocab</Link>
          <Link className="underline" href="/">UI chính</Link>
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
