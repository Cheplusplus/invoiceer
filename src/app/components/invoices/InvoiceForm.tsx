import { useUser } from "@auth0/nextjs-auth0/client"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, Dispatch, SetStateAction } from "react"
import { createInvoice } from "../../actions/actions"

/**
 * The form for taking in Invoice details
 */
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
