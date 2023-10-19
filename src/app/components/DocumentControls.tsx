import { Container, Typography, Box, Paper, Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import SaveIcon from "@mui/icons-material/Save"
import { Dispatch, ReactElement, SetStateAction } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteInvoice } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"


interface DocumentControlsProps {
  invoiceID: string
  setInvoicesPage: Dispatch<SetStateAction<"home" | "add-invoice" | "display-invoice">>
}
const DocumentControls = ({ invoiceID, setInvoicesPage }: DocumentControlsProps) => {
  const router = useRouter()

  const handleDelete = () => {
    deleteInvoice(invoiceID) // ----------->> Update to useOptimistic!
    router.refresh() 
    setInvoicesPage("home")
  }
  const sidebarIcons: [ReactElement, Function?, string?][] = [
    [<DownloadIcon />],
    [<EditIcon />],
    [<ContentCopyIcon />],
    [<SaveIcon />, setInvoicesPage, "home"],
    [<DeleteIcon />, handleDelete],
  ]
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        bgcolor: "#D4D4D4",
        width: "48px",
        position: "fixed",
        top: "0",
        right: "0",
        height: "100vh",
        pt: 4,
      }}
    >
      {sidebarIcons.map((item, i) => (
        <Button
          onClick={() => (item[1] ? item[1](item[2] || undefined) : undefined)}
          key={i}
          variant="outlined"
          sx={{
            minWidth: "0",
            maxWidth: "fit-content",
            p: 0,
            m: "0 auto",
            mt: 4,
            color: "#646464",
            borderColor: "#646464",
          }}
        >
          {item[0]}
        </Button>
      ))}
    </Box>
  )
}

export default DocumentControls
