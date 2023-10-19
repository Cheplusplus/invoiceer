import { Button } from "@mui/material"
import { getObjectFromForm } from "../../utils/utils"
import { deleteClient, updateClient } from "../../actions/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import "../../globals.css"

interface EditModeProps {
  client: Client
}
const EditMode = ({ client }: EditModeProps) => {
  return (
    <>
      <div className="flex-col flex-1">
        <input name="name" defaultValue={client.name}></input>
        <input name="email" defaultValue={client.email}></input>
      </div>
      <div className="flex-col flex-1">
        <input name="address1" form={client.id} defaultValue={client.address1}></input>
        <input name="address2" form={client.id} defaultValue={client.address2}></input>
      </div>
    </>
  )
}

interface DisplayModeProps {
  client: Client
}
const DisplayMode = ({ client }: DisplayModeProps) => {
  return (
    <>
      <div className="flex-col flex-1">
        <p>{client.name}</p>
        <p>{client.email}</p>
      </div>
      <div className="flex-col flex-1">
        <p>{client.address1}</p>
        <p>{client.address2}</p>
      </div>
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
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid black",
        minHeight: "110px",
      }}
    >
      <form
        id={client.id}
        action={(e) => {
          setIsEditMode(!isEditMode)
          if (!isEditMode) return
          updateClient(client.id ? client.id : "", getObjectFromForm<Client>(e))
          router.refresh()
        }}
      ></form>

      {isEditMode ? <EditMode client={client} /> : <DisplayMode client={client} />}

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
          form={client.id}
          type="submit"
        >
          {isEditMode ? <CheckIcon /> : <EditIcon />}
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
            deleteClient(client.id ? client.id : "")
            router.refresh()
          }}
        >
          {<DeleteIcon />}
        </Button>
      </div>
    </li>
  )
}

export default ClientCard
