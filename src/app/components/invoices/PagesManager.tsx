"use client"
import { useState } from "react"
import { InvoicesController, InvoicesList } from "./InvoicesComponents"
import { Paper } from "@mui/material"
import DocumentControls from "../DocumentControls"
import { InvoiceView } from "./InvoiceView"
import { InvoiceForm } from "./InvoiceForm"

const PAPER_SX_PROPS = {
  display: "flex",
  flexDirection: "column",
  mt: 10,
  p: 4,
  height: "80vh",
}

interface PagesManagerProps {
  invoices: Invoice[]
  clients: Client[]
}
export const PagesManager = ({ invoices, clients }: PagesManagerProps) => {
  const [pageState, setPageState] = useState<"home" | "addInvoice" | "displayInvoice">("home")
  const [invoiceID, setInvoiceID] = useState("")
  const [clientID, setClientID] = useState("")
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])

  const Home = () => {
    return (
      <Paper sx={PAPER_SX_PROPS} elevation={16}>
        <h1>Invoices</h1>
        <InvoicesController setInvoiceForm={setPageState} />
        <InvoicesList invoices={invoices} />
      </Paper>
    )
  }

  const AddInvoice = () => {
    return (
      <Paper sx={PAPER_SX_PROPS} elevation={16}>
        <InvoiceForm clients={clients} setInvoiceDisplay={setPageState} setInvoiceID={setInvoiceID} />
      </Paper>
    )
  }

  const DisplayInvoice = () => {
    return (
      <>
        <InvoiceView />
        <DocumentControls setInvoicesPage={setPageState} invoiceID={invoiceID}></DocumentControls>
      </>
    )
  }

  const pages = {
    home: <Home />,
    addInvoice: <AddInvoice />,
    displayInvoice: <DisplayInvoice />,
  }

  return <>{pages[pageState]}</>
}
