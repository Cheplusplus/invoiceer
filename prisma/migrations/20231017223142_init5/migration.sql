/*
  Warnings:

  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Client` table. All the data in the column will be lost.
  - Added the required column `updatedAT` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT,
    "address2" TEXT,
    "picture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL
);
INSERT INTO "new_User" ("address1", "address2", "email", "id", "name", "picture", "updatedAT") SELECT "address1", "address2", "email", "id", "name", "picture", "updatedAT" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_id_name_email_address1_address2_key" ON "User"("id", "name", "email", "address1", "address2");
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "clientID" TEXT NOT NULL,
    "paid" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Invoice_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Invoice_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientID", "id", "paid", "updatedAT", "userID") SELECT "clientID", "id", "paid", "updatedAT", "userID" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceID" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costInt" INTEGER NOT NULL,
    "costDec" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "InvoiceItem_invoiceID_fkey" FOREIGN KEY ("invoiceID") REFERENCES "Invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InvoiceItem" ("costDec", "costInt", "description", "id", "invoiceID", "quantity") SELECT "costDec", "costInt", "description", "id", "invoiceID", "quantity" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Client_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address1", "address2", "company", "email", "id", "name", "updatedAT", "userID") SELECT "address1", "address2", "company", "email", "id", "name", "updatedAT", "userID" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_id_name_email_address1_address2_key" ON "Client"("id", "name", "email", "address1", "address2");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
