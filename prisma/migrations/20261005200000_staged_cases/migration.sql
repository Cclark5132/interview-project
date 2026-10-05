-- AlterTable
ALTER TABLE "Question" ADD COLUMN "caseData" TEXT;

-- CreateTable
CREATE TABLE "CaseRun" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "stageIndex" INTEGER NOT NULL DEFAULT 0,
    "revealed" TEXT NOT NULL DEFAULT '[]',
    "results" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'active',
    "overallScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseRun_userId_questionId_createdAt_idx" ON "CaseRun"("userId", "questionId", "createdAt");

-- AddForeignKey
ALTER TABLE "CaseRun" ADD CONSTRAINT "CaseRun_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseRun" ADD CONSTRAINT "CaseRun_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
