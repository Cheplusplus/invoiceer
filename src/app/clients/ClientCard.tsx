import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { deleteClient, getObjectFromForm, updateClient } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"

interface ClientCardProps {
  client: Client
}
const ClientCard = ({ client }: ClientCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <li
      style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid black", minHeight: "110px" }}
    >
      <form
        id={client.id}
        action={async (e) => {
          setIsEditMode(!isEditMode)
          if (!isEditMode) return
          updateClient(client.id ? client.id : "", await getObjectFromForm<Client>(e))
          router.refresh()
        }}
      ></form>
      <div className="flex-col">
        {!isEditMode ? <p>{client.name}</p> : <input name="name" form={client.id} defaultValue={client.name}></input>}
        {!isEditMode ? (
          <p>{client.email}</p>
        ) : (
          <input name="email" form={client.id} defaultValue={client.email}></input>
        )}
      </div>
      <div className="flex-col">
        {!isEditMode ? (
          <p>{client.address1}</p>
        ) : (
          <input name="address1" form={client.id} defaultValue={client.address1}></input>
        )}
        {!isEditMode ? (
          <p>{client.address2}</p>
        ) : (
          <input name="address2" form={client.id} defaultValue={client.address2}></input>
        )}
      </div>
      <div style={{ position: "relative", transform: "translateY(25%)" }}>
        <button
          style={{
            aspectRatio: "1",
            height: "fit-content",
            marginRight: "8px",
          }}
          form={client.id}
          type="submit"
        >
          {!isEditMode ? <EditIcon /> : <CheckIcon />}
        </button>

        <button
          style={{
            aspectRatio: "1",
            height: "fit-content",
          }}
          onClick={() => {
            deleteClient(client.id ? client.id : "")
            router.refresh()
          }}
        >
          {<DeleteIcon />}
        </button>
      </div>
    </li>
  )
}

export default ClientCard
