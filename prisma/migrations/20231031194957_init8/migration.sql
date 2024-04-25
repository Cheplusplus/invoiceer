/*
  Warnings:

  - You are about to drop the column `costDec` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `costInt` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `cost` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceID" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "InvoiceItem_invoiceID_fkey" FOREIGN KEY ("invoiceID") REFERENCES "Invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InvoiceItem" ("createdAt", "description", "id", "invoiceID", "quantity", "updatedAT") SELECT "createdAt", "description", "id", "invoiceID", "quantity", "updatedAT" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
