import { useRouter } from "next/dist/client/components/navigation"
import { useState } from "react"
import { getObjectFromForm } from "../../utils/utils"
import { deleteInvoice, updateInvoice } from "../../actions/actions"
import { Button, Typography, Box, Input, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import styles from "./invoices.module.css"

/**
 * The DisplayMode and EditMode components are swapped out when
 * the user attempts to edit the content on the card.
 */
interface EditModeProps {
  invoice: Invoice
}
const DisplayMode = ({ invoice }: EditModeProps) => {
  return (
    <>
      <Box className="flex-col flex-1">
        <Typography variant="body1">{invoice.id}</Typography>
        <Typography variant="body1">{invoice.id}</Typography>
      </Box>
      <Box className="flex-col flex-1">
        <Typography variant="body1">{invoice.id}</Typography>
        <Typography variant="body1">{invoice.id}</Typography>
      </Box>
    </>
  )
}

interface DisplayModeProps {
  invoice: Invoice
}
const EditMode = ({ invoice }: DisplayModeProps) => {
  return (
    <>
      <Box className="flex-col flex-1">
        <Input name="name" defaultValue={invoice.id}></Input>
        <Input name="email" defaultValue={invoice.id}></Input>
      </Box>
      <Box className="flex-col flex-1">
        <Input name="address1" defaultValue={invoice.id}></Input>
        <Input name="address2" defaultValue={invoice.id}></Input>
      </Box>
    </>
  )
}

/**
 * The main component which holds the content of the card.
 */
interface InvoiceCardProps {
  invoice: Invoice
}
const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <form
      id={invoice.id}
      action={(e) => {
        setIsEditMode(!isEditMode)
        if (!isEditMode) return
        updateInvoice(invoice.id ? invoice.id : "", getObjectFromForm<Invoice>(e))
        router.refresh()
      }}
    >
      <ListItem className={styles.cardLayout}>
        {isEditMode ? <EditMode invoice={invoice} /> : <DisplayMode invoice={invoice} />}
        <Box className={styles.cardButtonHolder}>
          <Button variant="outlined" className={styles.cardButton} type="submit">
            {!isEditMode ? <EditIcon /> : <CheckIcon />}
          </Button>

          <Button
            variant="outlined"
            className={styles.cardButton}
            onClick={() => {
              deleteInvoice(invoice.id ? invoice.id : "")
              router.refresh()
            }}
          >
            {<DeleteIcon />}
          </Button>
        </Box>
      </ListItem>
    </form>
  )
}

export default InvoiceCard
