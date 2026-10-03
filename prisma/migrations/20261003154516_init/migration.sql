-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL DEFAULT 'engineering'
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    CONSTRAINT "Topic_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserTarget" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "disciplineId" TEXT NOT NULL,
    "companyId" TEXT,
    "roleId" TEXT,
    "level" TEXT NOT NULL,
    "skills" TEXT NOT NULL DEFAULT '[]',
    "focusTopics" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "JobParseCache" (
    "hash" TEXT NOT NULL PRIMARY KEY,
    "result" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "responseMode" TEXT NOT NULL DEFAULT 'text_or_speech',
    "evidenceCategory" TEXT NOT NULL DEFAULT 'original',
    "sourceNote" TEXT NOT NULL DEFAULT '',
    "sourceUrl" TEXT,
    "idealAnswer" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "rubricVersion" INTEGER NOT NULL DEFAULT 1,
    "approvedAt" DATETIME,
    "approvedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Question_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionTopic" (
    "questionId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "topicId"),
    CONSTRAINT "QuestionTopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionRole" (
    "questionId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    PRIMARY KEY ("questionId", "roleId"),
    CONSTRAINT "QuestionRole_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionCompany" (
    "questionId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "evidence" TEXT NOT NULL DEFAULT 'role_relevant',
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "sourceUrl" TEXT,

    PRIMARY KEY ("questionId", "companyId"),
    CONSTRAINT "QuestionCompany_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rubric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "criteria" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rubric_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "inputMode" TEXT NOT NULL DEFAULT 'typed',
    "assisted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'graded',
    "overallScore" REAL,
    "summary" TEXT,
    "breakdown" TEXT,
    "rubricVersion" INTEGER NOT NULL,
    "gradingMode" TEXT,
    "gradingModel" TEXT,
    "errorMessage" TEXT,
    "requestKey" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "questionId"),
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IdealReveal" (
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "questionId"),
    CONSTRAINT "IdealReveal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "IdealReveal_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Question_status_disciplineId_idx" ON "Question"("status", "disciplineId");

-- CreateIndex
CREATE UNIQUE INDEX "Rubric_questionId_version_key" ON "Rubric"("questionId", "version");

-- CreateIndex
CREATE INDEX "Attempt_userId_questionId_createdAt_idx" ON "Attempt"("userId", "questionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Attempt_userId_requestKey_key" ON "Attempt"("userId", "requestKey");
