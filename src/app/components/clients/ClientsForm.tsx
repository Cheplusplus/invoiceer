"use client"

/**
 * Form for collecting details of a new client to be created.
 */

import { Box, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createClient } from "../../actions/actions"

const ClientsForm = () => {
  const router = useRouter()
  const [isSubmitTrue, setIsSubmitTrue] = useState(false)
  const { register, control, handleSubmit, reset, formState } = useForm()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, isSubmitTrue, reset])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "40px",
          maxWidth: "150px",
        }}
      >
        <form
          id="client-form"
          onSubmit={handleSubmit((e) => {
            createClient(e as Client)
            router.refresh()
            setIsSubmitTrue(!isSubmitTrue)
          })}
        >
          <label>Names</label>
          <input {...register("name")}></input>

          <label>Email</label>
          <input {...register("email")}></input>

          <label>Address1</label>
          <input {...register("address1")}></input>

          <label>Address2</label>
          <input {...register("address2")}></input>
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Add Client
          </Button>
        </form>
      </Box>
    </>
  )
}

export default ClientsForm
