import { Box, Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import { Dispatch, ReactElement, SetStateAction } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteInvoice } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"
import { styles } from "./DocumentControls.styles"

interface DocumentControlsProps {
  invoiceID: string
  setInvoicesPage: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
}
const DocumentControls = ({ invoiceID, setInvoicesPage }: DocumentControlsProps) => {
  const router = useRouter()

  const handleSave = () => {
    setInvoicesPage("home")
  }
  const handleDelete = () => {
    deleteInvoice(invoiceID) // ----------->> Update to useOptimistic!
    router.refresh()
    setInvoicesPage("home")
  }

  let n = 0
  const sidebarIcons: [ReactElement, Function?][] = [
    [<DownloadIcon key={n++} />],
    [<EditIcon key={n++} />],
    [<ContentCopyIcon key={n++} />],
    [<SaveIcon key={n++} />, handleSave],
    [<DeleteIcon key={n++} />, handleDelete],
  ]

  return (
    <Box sx={styles.DocumentController}>
      <>
        {sidebarIcons.map((item, i) => (
          <Button onClick={() => item[1] && item[1]()} key={i} variant="outlined" sx={styles.DocumentControllerButton}>
            {item[0]}
          </Button>
        ))}
      </>
    </Box>
  )
}

export default DocumentControls
