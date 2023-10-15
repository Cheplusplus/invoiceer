"use client"

import ClientCard from "./ClientCard"

interface ClientsListProps {
  clients: Client[]
}
const ClientsList = ({ clients }: ClientsListProps) => {
  return clients.length > 0 ? (
    <ul style={{ width: "100%", height: "90vh", borderLeft: "2px solid black", marginLeft: "24px" }}>
      {clients.map((client, i) => {
        return <ClientCard client={client} key={i} />
      })}
    </ul>
  ) : (
    <>You haven't added any clients yet.</>
  )
}

export default ClientsList
