import ClientsList from "./ClientsList"
import ClientsForm from "./ClientsForm"
import { getClients } from "../server/server"

const ClientsPage = async () => {
  const clients = await getClients()
  return (
    <>
      <ClientsForm></ClientsForm>
      <ClientsList clients={clients}></ClientsList>
    </>
  )
}

export default ClientsPage
