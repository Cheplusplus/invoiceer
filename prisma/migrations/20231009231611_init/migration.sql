/*
  Warnings:

  - Added the required column `userID` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" DATETIME NOT NULL,
    CONSTRAINT "Client_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("address1", "address2", "createAt", "email", "id", "name", "updatedAT") SELECT "address1", "address2", "createAt", "email", "id", "name", "updatedAT" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_id_name_email_address1_address2_key" ON "Client"("id", "name", "email", "address1", "address2");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
