import { Dispatch, SetStateAction, useState } from "react"
import { getObjectFromForm } from "../../utils/utils"
import { Button, Typography, Box, Input, ListItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { styles } from "./invoices.styles"

/**
 * The DisplayMode and EditMode components are swapped out when
 * the user attempts to edit the content on the card.
 */
interface DisplayModeProps {
  invoiceItem: InvoiceItem
}
const DisplayMode = ({ invoiceItem }: DisplayModeProps) => {
  return (
    <>
      <Box className="flex-col flex-1">
        <>
          <Typography variant="body1">{invoiceItem.description}</Typography>
          <Typography variant="body1">{invoiceItem.cost}</Typography>
        </>
      </Box>
      <Box className="flex-col flex-1">
        <>
          <Typography variant="body1">{invoiceItem.quantity}</Typography>
        </>
      </Box>
    </>
  )
}

interface EditModeProps {
  invoiceItem: InvoiceItem
}
const EditMode = ({ invoiceItem }: EditModeProps) => {
  return (
    <>
      <Box className="flex-col flex-1">
        <>
          <Input name="description" defaultValue={invoiceItem.description}></Input>
          <Input name="cost" defaultValue={invoiceItem.cost}></Input>
        </>
      </Box>
      <Box className="flex-col flex-1">
        <Input name="quantity" defaultValue={invoiceItem.quantity}></Input>
      </Box>
    </>
  )
}

/**
 * The main component which holds the content of the card.
 */
interface InvoiceItemCardProps {
  invoiceItem: InvoiceItem
  invoiceItems: InvoiceItem[]
  setInvoiceItems: Dispatch<SetStateAction<InvoiceItem[]>>
  index: number
}
const InvoiceItemCard = ({ invoiceItem, invoiceItems, setInvoiceItems, index }: InvoiceItemCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <form
      action={(e) => {
        setIsEditMode(!isEditMode)
        if (!isEditMode) return
        const item = getObjectFromForm<InvoiceItem>(e)
        item.cost = parseFloat(item.cost.toString())
        item.quantity = parseFloat(item.quantity.toString())
        setInvoiceItems([...invoiceItems.slice(0, index), item, ...invoiceItems.slice(index + 1)])
      }}
    >
      <ListItem sx={styles.cardHolder}>
        {isEditMode ? <EditMode invoiceItem={invoiceItem} /> : <DisplayMode invoiceItem={invoiceItem} />}
        <Box sx={styles.cardButtonHolder}>
          <>
            <Button variant="outlined" sx={styles.cardButton} type="submit">
              {!isEditMode ? <EditIcon /> : <CheckIcon />}
            </Button>

            <Button
              variant="outlined"
              sx={styles.cardButton}
              onClick={() => {
                setInvoiceItems([...invoiceItems.slice(0, index), ...invoiceItems.slice(index + 1)])
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

export default InvoiceItemCard
