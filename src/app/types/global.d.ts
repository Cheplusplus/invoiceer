declare global {
  interface User {
    id: string
    name: string
    email: string
    address1?: string | null
    address2?: string | null
    picture?: string | null
  }

  interface Client {
    id?: string
    userID: string
    name: string
    company?: string
    email: string
    address1: string
    address2: string
  }

  interface Invoice {
    id?: string
    userID: string
    clientID: string
    paid?: boolean
  }

  interface InvoiceItem {
    id?: string
    invoiceID: string
    description: string
    cost: number
    quantity: number
  }
}
export {}
