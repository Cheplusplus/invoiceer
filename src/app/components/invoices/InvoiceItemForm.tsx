"use client"

import { getObjectFromForm } from "@/app/utils/utils"
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
      <Input {...register("description")} defaultValue="Add a description" />
      <Input {...register("cost")} defaultValue="Cost" />
      <Input {...register("quantity")} defaultValue="Quantity" />
      <Input type="submit" value="submit" />
    </form>
  )
}
export default InvoiceItemForm
