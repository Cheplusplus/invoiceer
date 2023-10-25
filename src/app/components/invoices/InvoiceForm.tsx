import { useUser } from "@auth0/nextjs-auth0/client"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, Dispatch, SetStateAction } from "react"
import { createInvoice } from "../../actions/actions"
import InvoiceItemForm from "./InvoiceItemForm"

/**
 * The form for taking in Invoice details
 */
interface InvoiceFormProps {
  clients: Client[]
  setInvoiceDisplay: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
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
          setInvoiceDisplay("displayInvoice")
          router.refresh()
        }}
      >
        <InputLabel>Select Client:</InputLabel>
        <Select value={client} label="Client" onChange={(e) => setClient(e.target.value)}>
          {clients.map((client, i) => (
            <MenuItem value={client.id} key={i}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
        <InvoiceItemForm />
        <Button variant="outlined" type="submit"></Button>
      </form>
    </FormControl>
  )
}
