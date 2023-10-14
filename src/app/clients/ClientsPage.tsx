import ClientsList from "./ClientsList"
import ClientsForm from "./ClientsForm"
import { getAllClients } from "../actions/actions"

const ClientsPage = async () => {
  const clients = await getAllClients()
  return (
    <>
      <ClientsForm></ClientsForm>
      <ClientsList clients={clients}></ClientsList>
    </>
  )
}

export default ClientsPage
