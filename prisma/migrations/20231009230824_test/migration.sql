/*
  Warnings:

  - You are about to drop the column `userID` on the `Client` table. All the data in the column will be lost.
  - Added the required column `clientAddress1` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAddress2` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientEmail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAT` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress1` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress2` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAT` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL
);
INSERT INTO "new_Client" ("address1", "address2", "createAt", "email", "id", "name", "updatedAT") SELECT "address1", "address2", "createAt", "email", "id", "name", "updatedAT" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_id_name_email_address1_address2_key" ON "Client"("id", "name", "email", "address1", "address2");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userAddress1" TEXT NOT NULL,
    "userAddress2" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientAddress1" TEXT NOT NULL,
    "clientAddress2" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Invoice_userID_userName_userEmail_userAddress1_userAddress2_fkey" FOREIGN KEY ("userID", "userName", "userEmail", "userAddress1", "userAddress2") REFERENCES "User" ("id", "name", "email", "address1", "address2") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientID_clientName_clientEmail_clientAddress1_clientAddress2_fkey" FOREIGN KEY ("clientID", "clientName", "clientEmail", "clientAddress1", "clientAddress2") REFERENCES "Client" ("id", "name", "email", "address1", "address2") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientID", "id", "userID") SELECT "clientID", "id", "userID" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "picture") SELECT "email", "id", "name", "picture" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_id_name_email_address1_address2_key" ON "User"("id", "name", "email", "address1", "address2");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
