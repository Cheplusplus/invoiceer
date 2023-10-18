"use client"
import { useState } from "react"
import { InvoicesController, InvoicesList, InvoiceForm } from "./InvoicesComponents"
import DashboardPage from "../dashboard/DashboardPage"
import { Paper } from "@mui/material"
import DocumentControls from "../components/DocumentControls"

interface PagesManagerProps {
  invoices: Invoice[]
  clients: Client[]
}
export const PagesManager = ({ invoices, clients }: PagesManagerProps) => {
  const [pageState, setPageState] = useState<"home" | "add-invoice" | "display-invoice">("home")
  const [invoiceID, setInvoiceID] = useState("")
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
          <DashboardPage />
          <DocumentControls setInvoicesPage={setPageState} invoiceID={invoiceID}></DocumentControls>
        </>
      ) : null}
    </>
  )
}
