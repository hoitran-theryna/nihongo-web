import { prisma } from "@/lib/prisma";

type Params = { id: string } | Promise<{ id: string }>;

function getId(params: Params) {
  // Hỗ trợ cả trường hợp params là object hoặc Promise (tùy version)
  return params instanceof Promise ? params.then((p: { id: string }) => p.id) : params.id;
}

export async function DELETE(
  _req: Request,
  { params }: { params: Params }
) {
  const id = await getId(params);

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  // deleteMany không throw nếu không tìm thấy (dễ debug hơn)
  const result = await prisma.vocab.deleteMany({ where: { id } });

  if (result.count === 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ ok: true });
}
