import { getAllInvoices, getAllClients } from "../../actions/actions"
import { PagesManager } from "./PagesManager"

const InvoicesPage = async () => {
  const invoices = await getAllInvoices()
  const clients = await getAllClients()

  return <PagesManager invoices={invoices} clients={clients} />
}

export default InvoicesPage
