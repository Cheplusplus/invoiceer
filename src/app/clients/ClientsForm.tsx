"use client"

import { Box } from "@mui/material"
import { createClient, getObjectFromForm } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"

const ClientsForm = () => {
  const router = useRouter()

  return (
    <>
      <form
        action={(e) => {
          createClient(getObjectFromForm<Client>(e))
          router.refresh()
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "40px",
            width: "250px",
          }}
        >
          <label>Names</label>
          <input name="name"></input>

          <label>Email</label>
          <input name="email"></input>

          <label>Address1</label>
          <input name="address1"></input>

          <label>Address2</label>
          <input name="address2"></input>

          <input type="submit" value="Add Client"></input>
        </Box>
      </form>
    </>
  )
}

export default ClientsForm
