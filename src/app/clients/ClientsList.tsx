interface ClientsListProps {
  clients: Client[]
}
const ClientsList = ({ clients }: ClientsListProps) => {
  return (
    <>
      {clients.map((client, i) => {
        return <li key={i}>{client.name}</li>
      })}
    </>
  )
}

export default ClientsList
