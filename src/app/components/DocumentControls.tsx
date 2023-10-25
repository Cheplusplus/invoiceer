import { Container, Typography, Box, Paper, Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import { Dispatch, ReactElement, SetStateAction } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteInvoice } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"
import { DocumentController, DocumentControllerButton } from "./mui.styles"

interface DocumentControlsProps {
  invoiceID: string
  setInvoicesPage: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
}
const DocumentControls = ({ invoiceID, setInvoicesPage }: DocumentControlsProps) => {
  const router = useRouter()

  const handleDelete = () => {
    deleteInvoice(invoiceID) // ----------->> Update to useOptimistic!
    router.refresh()
    setInvoicesPage("home")
  }
  const sidebarIcons: [ReactElement, Function?, string?][] = [
    [<DownloadIcon key={1} />],
    [<EditIcon key={2} />],
    [<ContentCopyIcon key={3} />],
    [<SaveIcon key={4} />, setInvoicesPage, "home"],
    [<DeleteIcon key={5} />, handleDelete],
  ]
  return (
    <Box sx={DocumentController}>
      {sidebarIcons.map((item, i) => (
        <Button
          onClick={() => (item[1] ? item[1](item[2] || undefined) : undefined)}
          key={i}
          variant="outlined"
          sx={DocumentControllerButton}
        >
          {item[0]}
        </Button>
      ))}
    </Box>
  )
}

export default DocumentControls
