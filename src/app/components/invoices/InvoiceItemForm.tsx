import React from "react"

const InvoiceItemForm = () => {
  return (
    <form>
      <input name="description" defaultValue="Add a description" />
      <input name="cost" defaultValue="Cost" />
      <input name="quantity" defaultValue="Quantity" />
      <input type="submit" />
    </form>
  )
}
export default InvoiceItemForm
