/*
  Warnings:

  - You are about to drop the column `clientAddress1` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientAddress2` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress1` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress2` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Invoice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Invoice_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientID", "createAt", "id", "paid", "updatedAT", "userID") SELECT "clientID", "createAt", "id", "paid", "updatedAT", "userID" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
