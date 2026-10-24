-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'student'
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Claim_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Claim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
