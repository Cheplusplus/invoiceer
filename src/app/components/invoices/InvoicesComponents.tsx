"use client"

import { Button, Box, List } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import InvoiceCard from "./InvoiceCard"
import styles from "./invoices.module.css"

export const SearchFilters = () => {
  return <div>Search Filters</div>
}

interface InvoicesControllerProps {
  setInvoiceForm: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
}
export const InvoicesController = ({ setInvoiceForm }: InvoicesControllerProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Button variant="contained" onClick={() => setInvoiceForm("addInvoice")}>
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
  if (invoices.length <= 0) return <p>You havent added any invoices yet.</p>
  return (
    <List className={styles.cardsHolder}>
      {invoices.map((invoice, i) => {
        return <InvoiceCard invoice={invoice} key={i} />
      })}
    </List>
  )
}
