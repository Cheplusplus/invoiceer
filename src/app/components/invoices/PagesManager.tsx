"use client"
import { useState } from "react"
import { InvoicesController, InvoicesList } from "./InvoicesComponents"
import { Paper } from "@mui/material"
import DocumentControls from "../DocumentControls"
import { InvoiceView } from "./InvoiceView"
import { InvoiceForm } from "./InvoiceForm"

interface PagesManagerProps {
  invoices: Invoice[]
  clients: Client[]
}
export const PagesManager = ({ invoices, clients }: PagesManagerProps) => {
  const [pageState, setPageState] = useState<"home" | "add-invoice" | "display-invoice">("home")
  const [invoiceID, setInvoiceID] = useState("")
  const [clientID, setClientID] = useState("")
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  return (
    <>
      {pageState === "home" ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 10,
            p: 4,
            height: "80vh",
          }}
          elevation={16}
        >
          <h1>Invoices</h1>
          <InvoicesController setInvoiceForm={setPageState} />
          <InvoicesList invoices={invoices} />
        </Paper>
      ) : pageState === "add-invoice" ? (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 10,
            p: 4,
            height: "80vh",
          }}
          elevation={16}
        >
          <InvoiceForm clients={clients} setInvoiceDisplay={setPageState} setInvoiceID={setInvoiceID} />
        </Paper>
      ) : pageState === "display-invoice" ? (
        <>
          <InvoiceView />
          <DocumentControls setInvoicesPage={setPageState} invoiceID={invoiceID}></DocumentControls>
        </>
      ) : null}
    </>
  )
}
