"use client"
import { deleteClient } from "../server/server"
import { useRouter } from "next/dist/client/components/navigation"

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
                deleteClient(client.id ? client.id : "")
                router.refresh()
              }}
            ></button>
          </>
        )
      })}
    </>
  )
}

export default ClientsList
