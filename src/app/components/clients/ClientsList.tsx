"use client"

import { List } from "@mui/material"
import ClientCard from "./ClientCard"
import { styles } from "./clients.styles"

/**
 * A list of the users created clients
 */
interface ClientsListProps {
  clients: Client[]
}
const ClientsList = ({ clients }: ClientsListProps) => {
  if (clients.length <= 0) return <p>You havent added any clients yet.</p>
  return (
    <List sx={styles.clientList}>
      {clients.map((client, i) => {
        return <ClientCard client={client} key={i} />
      })}
    </List>
  )
}

export default ClientsList
