-- CreateTable
CREATE TABLE "Vocab" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "reading" TEXT,
    "meaningVi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vocab_pkey" PRIMARY KEY ("id")
);
