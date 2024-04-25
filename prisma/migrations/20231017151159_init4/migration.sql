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
    CONSTRAINT "Invoice_clientID_clientName_clientEmail_clientAddress1_clientAddress2_fkey" FOREIGN KEY ("clientID", "clientName", "clientEmail", "clientAddress1", "clientAddress2") REFERENCES "Client" ("id", "name", "email", "address1", "address2") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("clientAddress1", "clientAddress2", "clientEmail", "clientID", "clientName", "createAt", "id", "paid", "updatedAT", "userAddress1", "userAddress2", "userEmail", "userID", "userName") SELECT "clientAddress1", "clientAddress2", "clientEmail", "clientID", "clientName", "createAt", "id", "paid", "updatedAT", "userAddress1", "userAddress2", "userEmail", "userID", "userName" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
