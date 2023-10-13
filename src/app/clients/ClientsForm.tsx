"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { createNewClient, getClients } from "../server/server"
import { useRouter } from "next/dist/client/components/navigation"
import useStateFromServer from "../hooks/useStateFromServer"

const ClientsForm = () => {
  // const [clients, setClients] = useStateFromServer<Client[]>()
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  if (!user) return <></>
  if (!user.sub) return <></>

  return (
    <>
      <form
        action={(e) => {
          createNewClient(e, user)
          router.refresh()
        }}
      >
        <input name="name"></input>
        <input name="email"></input>
        <input name="address1"></input>
        <input name="address2"></input>
        <input type="submit"></input>
      </form>
    </>
  )
}

export default ClientsForm
