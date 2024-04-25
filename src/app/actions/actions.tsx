"use server"

import { getSession } from "@auth0/nextjs-auth0"
import { headers } from "next/headers"
import prisma from "../db"

const createConstructor = <T,>(fn: Function, objType: string, useUser: boolean = true) => {
  return async (obj: T) => {
    const objRes = await obj
    const user = await getUser()
    const res = await fn({ data: useUser ? { ...objRes, userID: user?.sub } : objRes })
    console.log(`Created ${objType} at ${new Date().getTime()}:`)
    console.log(res)
    return res as T
  }
}

// export const createUser = async (obj: User) => {
//   const res = await obj
//   prisma.user.create({ data: { ...res } }).then((c: User) => {
//     console.log(`Created User at ${new Date().getTime()}:`)
//     console.log(c)
//   })
// }

const deleteConstructor = (fn: Function, objType: string) => {
  return async (id: string) => {
    fn({ where: { id: id } }).then((c: {}) => {
      console.log(`Deleted ${objType} at ${new Date().getTime()}:`)
      console.log(c)
    })
  }
}

const getManyFromUserIDConstructor = <T,>(fn: Function) => {
  return async () => {
    const user = await getUser()
    return fn({
      where: { userID: user?.sub },
    }) as T
  }
}

const getManyFromGivenKeyConstructor = <T,>(fn: Function) => {
  return async (key: {}) => {
    return fn({
      where: key,
    }) as T
  }
}

const getManyWhereConstructor = <T,>(fn: Function) => {
  return async (where: {}) => {
    const user = await getUser()
    return fn({
      where: where,
    }) as T
  }
}

const getWithIDConstructor = <T,>(fn: Function) => {
  return async (id: string) => {
    return fn({ where: { id: id } }) as T
  }
}

const updateConstructor = (fn: Function) => {
  return async (id: string, update: {}) => {
    await fn({ where: { id: id }, data: { ...update } }).then(() => {
      console.log(id + ` updated at ${new Date().getTime()}`)
    })
  }
}

export const getUser = async () => {
  const session = await getSession()
  return session?.user || null
}

export const getAppUser = async () => {
  const user = await getUser()
  return (await getWithIDConstructor(prisma.user.findUnique)(user?.sub)) as User
}

export const getPathname = () => {
  const headersList = headers()
  return "/" + headersList.get("referer")?.split("/")[3] || ""
}

export const createUser = createConstructor<User>(prisma.user.create, "User", false)
export const deleteUser = deleteConstructor(prisma.user.delete, "User")
export const getAllUsers = getManyFromUserIDConstructor<User[]>(prisma.user.findMany)
export const getUserWithID = getWithIDConstructor<User>(prisma.user.findUnique)
export const updateUser = updateConstructor(prisma.user.update)

export const createClient = createConstructor<Client>(prisma.client.create, "Client")
export const deleteClient = deleteConstructor(prisma.client.delete, "Client")
export const getAllClients = getManyFromUserIDConstructor<Client[]>(prisma.client.findMany)
export const getAllClientsWhere = getManyWhereConstructor<Client[]>(prisma.client.findMany)
export const getClientWithID = getWithIDConstructor<Client>(prisma.client.findUnique)
export const updateClient = updateConstructor(prisma.client.update)

export const createInvoice = createConstructor<Invoice>(prisma.invoice.create, "Invoice")
export const deleteInvoice = deleteConstructor(prisma.invoice.delete, "Invoice")
export const getAllInvoices = getManyFromUserIDConstructor<Invoice[]>(prisma.invoice.findMany)
export const getInvoiceWithID = getWithIDConstructor<Invoice>(prisma.invoice.findUnique)
export const updateInvoice = updateConstructor(prisma.invoice.update)

export const createInvoiceItem = createConstructor<InvoiceItem>(prisma.invoiceItem.create, "InvoiceItem", false)
export const deleteInvoiceItem = deleteConstructor(prisma.invoiceItem.delete, "InvoiceItem")
export const getAllInvoiceItems = getManyFromGivenKeyConstructor<InvoiceItem[]>(prisma.invoiceItem.findMany)
export const getInvoiceItemWithID = getWithIDConstructor<InvoiceItem>(prisma.invoiceItem.findUnique)
export const updateInvoiceItem = updateConstructor(prisma.invoiceItem.update)
