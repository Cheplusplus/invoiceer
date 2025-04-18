import { useRouter } from "next/dist/client/components/navigation"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { getObjectFromForm } from "../../utils/utils"
import { deleteInvoice, getUserWithID, updateInvoice, getClientWithID } from "../../actions/actions"
import { Button, Typography, Box, Input, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { styles } from "./invoices.styles"
import { Paper } from "@mui/material"
import { InvoiceForm } from "./InvoiceForm"

/**
 * The DisplayMode and EditMode components are swapped out when
 * the user attempts to edit the content on the card.
 */

interface DisplayModeProps {
  invoice: Invoice
}
const DisplayMode = ({ invoice }: DisplayModeProps) => {
  const [client, setClient] = useState<Client>()
  const getClient = async (id: string) => {
    const newClient = await getClientWithID(id)
    setClient(newClient)
  }
  useEffect(() => {
    getClient(invoice.clientID)
  }, [])

  return (
    <>
      <Box className="flex-col flex-1">
        <>
          <Typography variant="body1">{invoice.paid ? "paid" : "outstanding"}</Typography>
          <Typography variant="body1">{client?.name}</Typography>
        </>
      </Box>
      <Box className="flex-col flex-1">
        <>
          <Typography variant="body1">{client?.email}</Typography>
          <Typography variant="body1">{invoice.userID}</Typography>
        </>
      </Box>
    </>
  )
}

interface EditModeProps {
  invoice: Invoice
  setPageState: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
  setInvoice: Dispatch<SetStateAction<Invoice>>
}
const EditMode = ({ invoice, setPageState, setInvoice }: EditModeProps) => {
  return (
    <>
      <Paper sx={styles.paper} elevation={16}>
        <InvoiceForm setInvoiceDisplay={setPageState} setInvoice={setInvoice} />
      </Paper>
    </>
  )
}

/**
 * The main component which holds the content of the card.
 */
interface InvoiceCardProps {
  invoice: Invoice
  setPageState: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
  setInvoice: Dispatch<SetStateAction<Invoice>>
}
const InvoiceCard = ({ invoice, setPageState, setInvoice }: InvoiceCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <form>
      <ListItem sx={styles.cardHolder}>
        {isEditMode ? (
          <EditMode invoice={invoice} setPageState={setPageState} setInvoice={setInvoice} />
        ) : (
          <DisplayMode invoice={invoice} />
        )}
        <Box sx={styles.cardButtonHolder}>
          <>
            <Button
              variant="outlined"
              sx={styles.cardButton}
              onClick={() => {
                setInvoice(invoice)
                setPageState("displayInvoice")
              }}
            >
              {!isEditMode ? <EditIcon /> : <CheckIcon />}
            </Button>

            <Button
              variant="outlined"
              sx={styles.cardButton}
              onClick={() => {
                deleteInvoice(invoice.id ?? "")
                router.refresh()
              }}
            >
              {<DeleteIcon />}
            </Button>
          </>
        </Box>
      </ListItem>
    </form>
  )
}

export default InvoiceCard
