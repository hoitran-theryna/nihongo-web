import { prisma } from "@/lib/prisma";
import { requireEditorOrAdmin } from "@/lib/requireRole";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const guard = await requireEditorOrAdmin();
  if (!guard.ok) return Response.json({ error: "Unauthorized" }, { status: guard.status });

  const id = params?.id;

  // ✅ Chặn trường hợp id rỗng/undefined
  if (!id || typeof id !== "string" || id.trim() === "" || id === "undefined") {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.vocab.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (e: unknown) {
    // Không tìm thấy -> 404
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}
