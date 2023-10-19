"use client"

import { Button, Box } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import InvoiceCard from "./InvoiceCard"

export const SearchFilters = () => {
  return <div>Search Filters</div>
}

interface InvoicesControllerProps {
  setInvoiceForm: Dispatch<SetStateAction<"home" | "add-invoice" | "display-invoice">>
}
export const InvoicesController = ({ setInvoiceForm }: InvoicesControllerProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Button variant="contained" onClick={() => setInvoiceForm("add-invoice")}>
        Add New Invoice
      </Button>
      <SearchFilters />
    </Box>
  )
}

export const InvoiceButtons = () => {}

/**
 * A list of the users created clients
 */
interface InvoicesListProps {
  invoices: Invoice[]
}
export const InvoicesList = ({ invoices }: InvoicesListProps) => {
  if (invoices.length <= 0) return <p>You haven't added any invoices yet.</p>
  return (
    <ul style={{ width: "95%", height: "70vh", borderLeft: "2px solid black" }}>
      {invoices.map((invoice, i) => {
        return <InvoiceCard invoice={invoice} />
      })}
    </ul>
  )
}
