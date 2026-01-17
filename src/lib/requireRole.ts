import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface UserWithRole {
  role?: string;
}

export async function requireEditorOrAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as UserWithRole)?.role;

  if (!session?.user) return { ok: false, status: 401 as const };
  if (role !== "ADMIN" && role !== "EDITOR") return { ok: false, status: 403 as const };

  return { ok: true, session };
}
