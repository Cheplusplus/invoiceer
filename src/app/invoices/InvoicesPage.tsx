import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { InvoicesController, InvoicesList } from "./InvoicesComponents"
import { getAllInvoices, createInvoice, getAllClients } from "../actions/actions"
import useStateFromServer from "../hooks/useStateFromServer"
import { PagesManager } from "./PagesManager"

const InvoicesPage = async () => {
  const invoices = await getAllInvoices()
  const clients = await getAllClients()

  return <PagesManager invoices={invoices} clients={clients} />
}

export default InvoicesPage
