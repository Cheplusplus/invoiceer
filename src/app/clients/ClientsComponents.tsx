"use client"

import { Box, Button } from "@mui/material"
import { getObjectFromForm } from "../utils/utils"
import { createClient } from "../actions/actions"
import { useRouter } from "next/dist/client/components/navigation"

import { ReactNode, useEffect, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
import { deleteClient, updateClient } from "../actions/actions"
import { useForm } from "react-hook-form"

/**
 * Form for collecting details of a new client to be created.
 */
interface ClientsFormProps {
  children: ReactNode[]
}
export const ClientsForm = ({ children }: ClientsFormProps) => {
  const router = useRouter()
  const [isSubmitTrue, setIsSubmitTrue] = useState(false)
  const { register, control, handleSubmit, reset, formState } = useForm()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        address1: "",
        address2: "",
      })
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

/**
 * A list of the users created clients
 */
interface ClientsListProps {
  clients: Client[]
}
export const ClientsList = ({ clients }: ClientsListProps) => {
  return clients.length > 0 ? (
    <ul style={{ width: "100%", height: "70vh", borderLeft: "2px solid black", marginLeft: "24px" }}>
      {clients.map((client, i) => {
        return <ClientCard client={client} key={i} />
      })}
    </ul>
  ) : (
    <>You haven't added any clients yet.</>
  )
}

/**
 * The card which the client is displayed on and hold the delete and edit buttons.
 */
interface ClientCardProps {
  client: Client
}
const ClientCard = ({ client }: ClientCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const router = useRouter()

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid black",
        minHeight: "110px",
      }}
    >
      <form
        id={client.id}
        action={(e) => {
          setIsEditMode(!isEditMode)
          if (!isEditMode) return
          updateClient(client.id ? client.id : "", getObjectFromForm<Client>(e))
          router.refresh()
        }}
      ></form>
      <div className="flex-col flex-1">
        {!isEditMode ? <p>{client.name}</p> : <input name="name" form={client.id} defaultValue={client.name}></input>}
        {!isEditMode ? (
          <p>{client.email}</p>
        ) : (
          <input name="email" form={client.id} defaultValue={client.email}></input>
        )}
      </div>
      <div className="flex-col flex-1">
        {!isEditMode ? (
          <p>{client.address1}</p>
        ) : (
          <input name="address1" form={client.id} defaultValue={client.address1}></input>
        )}
        {!isEditMode ? (
          <p>{client.address2}</p>
        ) : (
          <input name="address2" form={client.id} defaultValue={client.address2}></input>
        )}
      </div>
      <div style={{ position: "relative", top: "35px" }}>
        <Button
          variant="outlined"
          style={{
            minWidth: 0,
            padding: 4,
            aspectRatio: "1",
            height: "fit-content",
            marginRight: 6,
          }}
          form={client.id}
          type="submit"
        >
          {!isEditMode ? <EditIcon /> : <CheckIcon />}
        </Button>

        <Button
          variant="outlined"
          style={{
            minWidth: 0,
            padding: 4,
            aspectRatio: "1",
            height: "fit-content",
          }}
          onClick={() => {
            deleteClient(client.id ? client.id : "")
            router.refresh()
          }}
        >
          {<DeleteIcon />}
        </Button>
      </div>
    </li>
  )
}
