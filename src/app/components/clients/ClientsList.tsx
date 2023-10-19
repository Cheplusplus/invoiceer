"use client"

import ClientCard from "./ClientCard"

/**
 * A list of the users created clients
 */
interface ClientsListProps {
  clients: Client[]
}
const ClientsList = ({ clients }: ClientsListProps) => {
  if (clients.length <= 0) return <p>You haven't added any clients yet.</p>
  return (
    <ul style={{ width: "100%", height: "70vh", borderLeft: "2px solid black", marginLeft: "24px" }}>
      {clients.map((client, i) => {
        return <ClientCard client={client} key={i} />
      })}
    </ul>
  )
}

export default ClientsList
