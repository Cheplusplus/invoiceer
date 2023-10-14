"use client"

import { createClient, getObjectFromForm, getAppUser } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"

const ClientsForm = () => {
  const router = useRouter()

  return (
    <>
      <form
        action={(e) => {
          createClient(getObjectFromForm<Client>(e))
          console.log(getAppUser())
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
