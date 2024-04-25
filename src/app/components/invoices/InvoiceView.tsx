import { useEffect, useState } from "react"
import PageContent from "../PageContent"
import { getAllInvoiceItems, getClientWithID, getUserWithID } from "@/app/actions/actions"

interface InvoiceViewProps {
  invoice: Invoice
}
export const InvoiceView = ({ invoice }: InvoiceViewProps) => {
  const [client, setClient] = useState<Client>({
    name: "",
    company: "",
    email: "",
    address1: "",
    address2: "",
  })
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    address1: "",
    address2: "",
  })
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])

  useEffect(() => {
    getAllInvoiceItems({ invoiceID: invoice.id }).then((items) => setInvoiceItems(items))
    getClientWithID(invoice.clientID).then((client) => setClient(client))
    getUserWithID(invoice.userID).then((user) => setUser(user))
  }, [])
  return (
    <PageContent>
      <h1>Invoice</h1>
      <p>Reference #:{invoice.id}</p>
      <p>{client.name}</p>
      <p>{client.company}</p>
      <p>{client.email}</p>
      <p>{client.address1}</p>
      <p>{client.address2}</p>

      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.address1}</p>
      <p>{user.address2}</p>

      {invoiceItems.map((item) => {
        return (
          <p>
            {item.description}: R {item.cost}({item.quantity})
          </p>
        )
      })}
      <p>
        Total: R
        {invoiceItems.reduce((acc, cv) => {
          return acc + cv.cost * cv.quantity
        }, 0)}
      </p>
    </PageContent>
  )
}
