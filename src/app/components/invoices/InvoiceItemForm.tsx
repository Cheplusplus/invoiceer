"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input, Button } from "@mui/material"
import { useForm } from "react-hook-form"

interface InvoiceItemFormProps {
  setInvoiceItems: Dispatch<SetStateAction<InvoiceItem[]>>
}
const InvoiceItemForm = ({ setInvoiceItems }: InvoiceItemFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm()
  const [isSubmitTrue, setIsSubmitTrue] = useState(false)

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, isSubmitTrue, reset])

  return (
    <form
      onSubmit={handleSubmit((item) => {
        setInvoiceItems((prev) => [...prev, item as InvoiceItem])
        setIsSubmitTrue(!isSubmitTrue)
      })}
    >
      <Input {...register("description")} placeholder="Description" />
      <Input {...register("cost")} placeholder="Cost" />
      <Input {...register("quantity")} placeholder="Quantity" />
      <Button type="submit" variant="outlined">
        Add
      </Button>
    </form>
  )
}
export default InvoiceItemForm
