"use server"

import { getSession } from "@auth0/nextjs-auth0"
import { headers } from "next/headers"
import prisma from "../db"

const createConstructor = (fn: Function, objType: string) => {
  return async (obj: {}) => {
    fn({ data: obj }).then((c: {}) => {
      console.log(`Added ${objType}:`)
      console.log(c)
    })
  }
}

const deleteConstructor = (fn: Function, objType: string) => {
  return async (id: string) => {
    fn({ where: { id: id } }).then((c: {}) => {
      console.log(`Deleted ${objType}:`)
      console.log(c)
    })
  }
}

const getManyFromUserIDConstructor = (fn: Function) => {
  return async () => {
    const user = await getUser()
    return fn({
      where: { userID: user?.sub },
    })
  }
}

const getWithIDConstructor = (fn: Function) => {
  return async (id: string) => {
    return fn({ where: { id: id } })
  }
}

const updateConstructor = (fn: Function) => {
  const update = { name: "Johannes" }
  return async (id: string) => {
    await fn({ where: { id: id }, data: { ...update } }).then(() => {
      console.log(id + " updated!")
    })
  }
}

export const getUser = async () => {
  const session = await getSession()
  return session?.user || null
}

export const getAppUser = async () => {
  const user = await getUser()
  return getWithIDConstructor(prisma.user.findUnique)(user?.sub)
}

export const getPathname = () => {
  const headersList = headers()
  return "/" + headersList.get("referer")?.split("/")[3] || ""
}

export const getObjectFromForm = <T extends {}>(data: FormData): T => {
  let t = {}
  for (const pair of data.entries()) {
    const y = { [pair[0]]: pair[1] }
    t = { ...t, ...y }
  }
  return t as T
}

export const createClient = createConstructor(prisma.client.create, "Client")
export const deleteClient = deleteConstructor(prisma.client.delete, "Client")
export const getAllClients = getManyFromUserIDConstructor(prisma.client.findMany)
export const getClientWithID = getWithIDConstructor(prisma.client.findUnique)
export const updateClient = updateConstructor(prisma.client.update)

export const createInvoice = createConstructor(prisma.invoice.create, "Invoice")
export const deleteInvoice = deleteConstructor(prisma.invoice.delete, "Invoice")
export const getAllInvoices = getManyFromUserIDConstructor(prisma.invoice.findMany)
export const getInvoiceWithID = getWithIDConstructor(prisma.invoice.findUnique)
export const updateInvoice = updateConstructor(prisma.invoice.update)
