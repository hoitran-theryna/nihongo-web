import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.vocab.createMany({
    data: [
      { word: "私", reading: "わたし", meaningVi: "tôi" },
      { word: "日本", reading: "にほん", meaningVi: "Nhật Bản" },
      { word: "食べる", reading: "たべる", meaningVi: "ăn" },
      { word: "学校", reading: "がっこう", meaningVi: "trường học" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
