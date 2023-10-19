import { useRouter } from "next/dist/client/components/navigation"
import { useState } from "react"
import { getObjectFromForm } from "../../utils/utils"
import { deleteInvoice, updateInvoice } from "../../actions/actions"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"

interface EditModeProps {
  invoice: Invoice
}
const DisplayMode = ({ invoice }: EditModeProps) => {
  return (
    <>
      <div className="flex-col flex-1">
        <p>{invoice.id}</p>
        <p>{invoice.id}</p>
      </div>
      <div className="flex-col flex-1">
        <p>{invoice.id}</p>
        <p>{invoice.id}</p>
      </div>
    </>
  )
}

interface DisplayModeProps {
  invoice: Invoice
}
const EditMode = ({ invoice }: DisplayModeProps) => {
  return (
    <>
      <div className="flex-col flex-1">
        <input name="name" defaultValue={invoice.id}></input>
        <input name="email" defaultValue={invoice.id}></input>
      </div>
      <div className="flex-col flex-1">
        <input name="address1" defaultValue={invoice.id}></input>
        <input name="address2" defaultValue={invoice.id}></input>
      </div>
    </>
  )
}

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
    <form
      id={invoice.id}
      action={(e) => {
        setIsEditMode(!isEditMode)
        if (!isEditMode) return
        updateInvoice(invoice.id ? invoice.id : "", getObjectFromForm<Invoice>(e))
        router.refresh()
      }}
    >
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "2px solid black",
          minHeight: "110px",
        }}
      >
        {isEditMode ? <EditMode invoice={invoice} /> : <DisplayMode invoice={invoice} />}
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
    </form>
  )
}

export default InvoiceCard
