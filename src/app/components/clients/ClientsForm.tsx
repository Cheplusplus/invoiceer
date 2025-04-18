"use client"

/**
 * Form for collecting details of a new client to be created.
 */

import { Box, Button, Input, InputLabel } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createClient } from "../../actions/actions"
import { styles } from "./clients.styles"

const ClientsForm = () => {
  const router = useRouter()
  const [isSubmitTrue, setIsSubmitTrue] = useState(false)
  const { register, handleSubmit, reset, formState } = useForm()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, isSubmitTrue, reset])

  return (
    <>
      <Box sx={styles.clientFormStyle}>
        <>
          <form
            onSubmit={handleSubmit((e) => {
              createClient(e as Client)
              router.refresh()
              setIsSubmitTrue(!isSubmitTrue)
            })}
          >
            <InputLabel>Names</InputLabel>
            <Input {...register("name")}></Input>

            <InputLabel>Email</InputLabel>
            <Input {...register("email")}></Input>

            <InputLabel>Address1</InputLabel>
            <Input {...register("address1")}></Input>

            <InputLabel>Address2</InputLabel>
            <Input {...register("address2")}></Input>
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Add Client
            </Button>
          </form>
        </>
      </Box>
    </>
  )
}

export default ClientsForm
