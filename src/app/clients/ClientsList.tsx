"use client"
import { deleteClient } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"
import DeleteIcon from "@mui/icons-material/Delete"

interface ClientsListProps {
  clients: Client[]
}
const ClientsList = ({ clients }: ClientsListProps) => {
  const router = useRouter()
  return (
    <>
      {clients.map((client, i) => {
        return (
          <>
            <li key={i}>{client.name}</li>
            <button
              onClick={() => {
                deleteClient(client.id || "")
                router.refresh()
              }}
            >
              {<DeleteIcon />}
            </button>
          </>
        )
      })}
    </>
  )
}

export default ClientsList
