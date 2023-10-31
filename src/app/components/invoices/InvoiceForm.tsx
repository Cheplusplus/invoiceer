import { useUser } from "@auth0/nextjs-auth0/client"
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, Dispatch, SetStateAction } from "react"
import { createInvoice, createInvoiceItem } from "../../actions/actions"
import InvoiceItemForm from "./InvoiceItemForm"
import InvoiceItemCard from "./InvoiceItemCard"

/**
 * The form for taking in Invoice details
 */
interface InvoiceFormProps {
  clients: Client[]
  setInvoiceDisplay: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
  setInvoice: Dispatch<SetStateAction<Invoice>>
}
export const InvoiceForm = ({ clients, setInvoiceDisplay, setInvoice }: InvoiceFormProps) => {
  const [client, setClient] = useState("")
  const { user, error, isLoading } = useUser()
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const router = useRouter()

  return (
    <>
      <FormControl>
        <form
          action={async () => {
            const newInvoice = await createInvoice({
              userID: user?.sub || "",
              clientID: client,
            })

            invoiceItems.map(async (item) => {
              await createInvoiceItem({
                invoiceID: newInvoice.id || "",
                description: item.description,
                cost: parseFloat(`${item.cost}`),
                quantity: parseFloat(`${item.quantity}`),
              })
            })
            setInvoice(newInvoice)
            setInvoiceDisplay("displayInvoice")
            router.refresh()
          }}
        >
          <InputLabel>Select Client:</InputLabel>
          <Select sx={{ width: "300px" }} value={client} label="Client" onChange={(e) => setClient(e.target.value)}>
            {clients.map((client, i) => (
              <MenuItem value={client.id} key={i}>
                {client.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant="outlined" type="submit">
            Create Invoice
          </Button>
        </form>
      </FormControl>
      <Typography variant="h5">Add Items:</Typography>
      <InvoiceItemForm setInvoiceItems={setInvoiceItems} />
      {invoiceItems.map((item, i) => (
        <InvoiceItemCard invoiceItem={item} index={i} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
      ))}
    </>
  )
}
