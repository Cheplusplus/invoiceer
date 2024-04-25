"use client"
import { useState } from "react"
import { InvoicesController, InvoicesList } from "./InvoicesComponents"
import { Paper } from "@mui/material"
import DocumentControls from "../DocumentControls"
import { InvoiceView } from "./InvoiceView"
import { InvoiceForm } from "./InvoiceForm"
import { styles } from "./invoices.styles"

interface PagesManagerProps {
  invoices: Invoice[]
  clients: Client[]
}
export const PagesManager = ({ invoices, clients }: PagesManagerProps) => {
  const [pageState, setPageState] = useState<"home" | "addInvoice" | "displayInvoice">("home")
  const [invoice, setInvoice] = useState<Invoice>({ userID: "", clientID: "" })

  const Home = () => {
    return (
      <Paper sx={styles.paper} elevation={16}>
        <h1>Invoices</h1>
        <InvoicesController setInvoiceForm={setPageState} />
        <InvoicesList invoices={invoices} setPageState={setPageState} setInvoice={setInvoice} />
      </Paper>
    )
  }

  const AddInvoice = () => {
    return (
      <Paper sx={styles.paper} elevation={16}>
        <InvoiceForm _clients={clients} setInvoiceDisplay={setPageState} setInvoice={setInvoice} />
      </Paper>
    )
  }

  const DisplayInvoice = () => {
    return (
      <>
        <InvoiceView invoice={invoice} />
        <DocumentControls setInvoicesPage={setPageState} invoiceID={invoice?.id || ""}></DocumentControls>
      </>
    )
  }

  const pages = {
    home: <Home />,
    addInvoice: <AddInvoice />,
    displayInvoice: <DisplayInvoice />,
  }

  return (
    <>
      <>{pages[pageState]}</>
    </>
  )
}
