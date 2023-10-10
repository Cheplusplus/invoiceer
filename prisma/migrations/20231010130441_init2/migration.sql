/*
  Warnings:

  - Added the required column `paid` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "paid" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Invoice_userID_userName_userEmail_userAddress1_userAddress2_fkey" FOREIGN KEY ("userID", "userName", "userEmail", "userAddress1", "userAddress2") REFERENCES "User" ("id", "name", "email", "address1", "address2") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientID_clientName_clientEmail_clientAddress1_clientAddress2_fkey" FOREIGN KEY ("clientID", "clientName", "clientEmail", "clientAddress1", "clientAddress2") REFERENCES "Client" ("id", "name", "email", "address1", "address2") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientAddress1", "clientAddress2", "clientEmail", "clientID", "clientName", "createAt", "id", "updatedAT", "userAddress1", "userAddress2", "userEmail", "userID", "userName") SELECT "clientAddress1", "clientAddress2", "clientEmail", "clientID", "clientName", "createAt", "id", "updatedAT", "userAddress1", "userAddress2", "userEmail", "userID", "userName" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "picture" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL
);
INSERT INTO "new_User" ("address1", "address2", "createAt", "email", "id", "name", "picture", "updatedAT") SELECT "address1", "address2", "createAt", "email", "id", "name", "picture", "updatedAT" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_id_name_email_address1_address2_key" ON "User"("id", "name", "email", "address1", "address2");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
