"use server"

import { UserProfile } from "@auth0/nextjs-auth0/client"
import { getSession } from "@auth0/nextjs-auth0"
import { headers } from "next/headers"
import prisma from "../db"

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
  prisma.client.create({ data: c }).then((client) => {
    console.log("Added Client:")
    console.log(client)
  })
}

export const getClients = async (): Promise<Client[]> => {
  const session = await getSession()
  const user = session?.user || null

  return prisma.client.findMany({
    where: { userID: user?.sub },
  })
}

export const deleteClient = async (id: string) => {
  prisma.client.delete({ where: { id: id } }).then((client) => {
    console.log("Deleted Client:")
    console.log(client)
  })
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
  return headersList.get("referer") || ""
}
