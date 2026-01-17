import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.vocab.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const word = body?.word?.trim();
  const reading = body?.reading?.trim() || null;
  const meaningVi = body?.meaningVi?.trim();

  if (!word || !meaningVi) {
    return Response.json(
      { error: "word và meaningVi là bắt buộc" },
      { status: 400 }
    );
  }

  const created = await prisma.vocab.create({
    data: { word, reading, meaningVi },
  });

  return Response.json({ data: created }, { status: 201 });
}
