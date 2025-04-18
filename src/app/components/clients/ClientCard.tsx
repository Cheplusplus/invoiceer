import { Box, Button, Input, ListItem, Typography } from "@mui/material"
import { getObjectFromForm } from "../../utils/utils"
import { deleteClient, updateClient } from "../../actions/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { styles } from "./clients.styles"

interface EditModeProps {
  client: Client
}
const EditMode = ({ client }: EditModeProps) => {
  return (
    <>
      <Box sx={styles.cardInputHolder}>
        <>
          <Input name="name" defaultValue={client.name}></Input>
          <Input name="email" defaultValue={client.email}></Input>
        </>
      </Box>
      <Box sx={styles.cardInputHolder}>
        <>
          <Input name="address1" defaultValue={client.address1}></Input>
          <Input name="address2" defaultValue={client.address2}></Input>
        </>
      </Box>
    </>
  )
}

interface DisplayModeProps {
  client: Client
}
const DisplayMode = ({ client }: DisplayModeProps) => {
  return (
    <>
      <Box sx={styles.cardInputHolder}>
        <>
          <Typography variant="body1">{client.name}</Typography>
          <Typography variant="body1">{client.email}</Typography>
        </>
      </Box>
      <Box sx={styles.cardInputHolder}>
        <>
          <Typography variant="body1">{client.address1}</Typography>
          <Typography variant="body1">{client.address2}</Typography>
        </>
      </Box>
    </>
  )
}

/**
 * The card which the client is displayed on and hold the delete and edit buttons.
 */
interface ClientCardProps {
  client: Client
}
const ClientCard = ({ client }: ClientCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <form
      id={client.id}
      action={(e) => {
        setIsEditMode(!isEditMode)
        if (!isEditMode) return
        updateClient(client.id || "", getObjectFromForm<Client>(e))
        router.refresh()
      }}
    >
      <ListItem sx={styles.cardHolder}>
        {isEditMode ? <EditMode client={client} /> : <DisplayMode client={client} />}

        <Box sx={styles.cardButtonHolder}>
          <>
            <Button variant="outlined" sx={styles.cardButton} type="submit">
              {isEditMode ? <CheckIcon /> : <EditIcon />}
            </Button>

            <Button
              variant="outlined"
              sx={styles.cardButton}
              onClick={() => {
                deleteClient(client.id || "")
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

export default ClientCard
