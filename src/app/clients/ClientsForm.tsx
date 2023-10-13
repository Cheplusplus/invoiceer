"use client"

import { Dispatch, SetStateAction, startTransition, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { createNewClient, test, getClients } from "../server/server"
import { useRouter } from "next/dist/client/components/navigation"
import useStateFromServer from "../hooks/useStateFromServer"

const ClientsForm = () => {
  const [clients, setClients] = useStateFromServer<Client[]>()
  const { user, error, isLoading } = useUser()
  const router = useRouter()
  if (!user) return <></>
  if (!user.sub) return <></>

  return (
    <>
      <form
        action={async (e) => {
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
      <button
        onClick={
          setClients && !(setClients instanceof Promise)
            ? () => setClients(getClients())
            : () => {}
        }
      ></button>
      <>
        {clients instanceof Promise
          ? clients.then((c) =>
              c.map((p) => {
                return <>{p.name}</>
              })
            )
          : null}
      </>
    </>
  )
}

export default ClientsForm
