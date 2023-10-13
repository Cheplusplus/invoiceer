import ClientsList from "./ClientsList"
import ClientsForm from "./ClientsForm"
import { getClients } from "../server/server"

const ClientsPage = async () => {
  const clients = await getClients()
  return (
    <>
      <ClientsList clients={clients}></ClientsList>
      <ClientsForm></ClientsForm>
    </>
  )
}

export default ClientsPage
