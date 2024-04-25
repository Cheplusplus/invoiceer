-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceID" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costInt" INTEGER NOT NULL,
    "costDec" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "InvoiceItem_invoiceID_fkey" FOREIGN KEY ("invoiceID") REFERENCES "Invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
