"use client"

import { Button, Box, Input, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { Dispatch, useState, SetStateAction } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { createInvoice, deleteInvoice, updateInvoice } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"
import { getObjectFromForm } from "../utils/utils"
import { useUser } from "@auth0/nextjs-auth0/client"

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
 * The card which the client is displayed on and hold the delete and edit buttons.
 */
interface InvoiceCardProps {
  invoice: Invoice
}
const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid black",
        minHeight: "110px",
      }}
    >
      <form
        id={invoice.id}
        action={(e) => {
          setIsEditMode(!isEditMode)
          if (!isEditMode) return
          updateInvoice(invoice.id ? invoice.id : "", getObjectFromForm<Invoice>(e))
          router.refresh()
        }}
      ></form>
      <div className="flex-col flex-1">
        {!isEditMode ? <p>{invoice.id}</p> : <input name="name" form={invoice.id} defaultValue={invoice.id}></input>}
        {!isEditMode ? <p>{invoice.id}</p> : <input name="email" form={invoice.id} defaultValue={invoice.id}></input>}
      </div>
      <div className="flex-col flex-1">
        {!isEditMode ? <p></p> : <input name="address1" form={invoice.id} defaultValue={invoice.id}></input>}
        {!isEditMode ? <p></p> : <input name="address2" form={invoice.id} defaultValue={invoice.id}></input>}
      </div>
      <div style={{ position: "relative", top: "35px" }}>
        <Button
          variant="outlined"
          style={{
            minWidth: 0,
            padding: 4,
            aspectRatio: "1",
            height: "fit-content",
            marginRight: 6,
          }}
          form={invoice.id}
          type="submit"
        >
          {!isEditMode ? <EditIcon /> : <CheckIcon />}
        </Button>

        <Button
          variant="outlined"
          style={{
            minWidth: 0,
            padding: 4,
            aspectRatio: "1",
            height: "fit-content",
          }}
          onClick={() => {
            deleteInvoice(invoice.id ? invoice.id : "")
            router.refresh()
          }}
        >
          {<DeleteIcon />}
        </Button>
      </div>
    </li>
  )
}

/**
 * A list of the users created clients
 */
interface InvoicesListProps {
  invoices: Invoice[]
}
export const InvoicesList = ({ invoices }: InvoicesListProps) => {
  return invoices.length > 0 ? (
    <ul style={{ width: "95%", height: "70vh", borderLeft: "2px solid black" }}>
      {invoices.map((invoice, i) => {
        return <InvoiceCard invoice={invoice} />
      })}
    </ul>
  ) : (
    <>You haven't added any invoices yet.</>
  )
}
interface InvoiceFormProps {
  clients: Client[]
  setInvoiceDisplay: Dispatch<SetStateAction<"home" | "add-invoice" | "display-invoice">>
  setInvoiceID: Dispatch<SetStateAction<string>>
}
export const InvoiceForm = ({ clients, setInvoiceDisplay, setInvoiceID }: InvoiceFormProps) => {
  const [client, setClient] = useState("")
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  return (
    <FormControl>
      <form
        action={async () => {
          const newInvoice = await createInvoice({
            userID: user?.sub || "",
            clientID: client,
          })
          setInvoiceID(newInvoice.id || "")
          setInvoiceDisplay("display-invoice")
          router.refresh()
        }}
      >
        <InputLabel>Select Client:</InputLabel>
        <Select value={client} label="Client" onChange={(e) => setClient(e.target.value)}>
          {clients.map((client) => (
            <MenuItem value={client.id}>{client.name}</MenuItem>
          ))}
        </Select>
        <Button variant="outlined" type="submit"></Button>
      </form>
    </FormControl>
  )
}
