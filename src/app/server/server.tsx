"use server"

import { UserProfile } from "@auth0/nextjs-auth0/client"
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
  const session = await getSession()
  const user = session?.user || null
  return await prisma.user.findUnique({
    where: { id: user?.sub },
  })
}

export const getPathname = () => {
  const headersList = headers()
  return "/" + headersList.get("referer")?.split("/")[3] || ""
}

export const createClient = createConstructor(prisma.client.create, "Client")
export const deleteClient = deleteConstructor(prisma.client.delete, "Client")
export const getAllClients = getManyFromUserIDConstructor(
  prisma.client.findMany
)
export const getClientWithID = getWithIDConstructor(prisma.client.findUnique)
export const updateClient = updateConstructor(prisma.client.update)

export const createNewClient = async (data: FormData, user: UserProfile) => {
  const name = data.get("name")?.valueOf().toString() || ""
  const email = data.get("email")?.valueOf().toString() || ""
  const address1 = data.get("address1")?.valueOf().toString() || ""
  const address2 = data.get("address2")?.valueOf().toString() || ""
  if (!user.sub) throw new Error("Unreckognized user - Unable to create entry")
  const c: Client = {
    userID: user.sub,
    name: name,
    email: email,
    address1: address1,
    address2: address2,
  }
  createClient(c)
}
