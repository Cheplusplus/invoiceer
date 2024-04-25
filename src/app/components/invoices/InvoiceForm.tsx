import { useUser } from "@auth0/nextjs-auth0/client"
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { createInvoice, createInvoiceItem, updateInvoice, getInvoiceWithID, getAllClients } from "../../actions/actions"
import InvoiceItemForm from "./InvoiceItemForm"
import InvoiceItemCard from "./InvoiceItemCard"

/**
 * The form for taking in Invoice details
 */

interface InvoiceFormProps {
  setInvoiceDisplay: Dispatch<SetStateAction<"home" | "addInvoice" | "displayInvoice">>
  setInvoice: Dispatch<SetStateAction<Invoice>>
  _clients?: Client[]
  action?: "create" | "update"
  id?: string | "empty"
}
export const InvoiceForm = ({
  setInvoiceDisplay,
  setInvoice,
  _clients = [],
  action = "create",
  id = "empty",
}: InvoiceFormProps) => {
  const [client, setClient] = useState("")
  const [clients, setClients] = useState(_clients)
  const { user, error, isLoading } = useUser()
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const [invoiceID, setInvoiceID] = useState<string>(id)
  const router = useRouter()

  useEffect(() => {
    if (action === "update")
      getInvoiceWithID(invoiceID).then((data) => {
        setClient(data.clientID)
      })

    if (clients.length === 0)
      getAllClients().then((data) => {
        setClients(data)
        setInvoiceDisplay("addInvoice")
      })
  }, [])

  return (
    <>
      <FormControl>
        <form
          action={async () => {
            if (action === "update") {
              updateInvoice(invoiceID, { client: client, invoiceItems: invoiceItems })
              router.refresh()
              setInvoiceDisplay("displayInvoice")
              return
            }
            const newInvoice = await createInvoice({
              userID: user?.sub || "",
              clientID: client,
            })

            invoiceItems.map(async (item) => {
              await createInvoiceItem({
                invoiceID: newInvoice.id || "",
                description: item.description,
                cost: parseFloat(item.cost.toString()),
                quantity: parseFloat(item.quantity.toString()),
              })
            })
            setInvoice(() => newInvoice)
            router.refresh()
            setInvoiceDisplay("displayInvoice")
          }}
        >
          <InputLabel>Select Client:</InputLabel>
          <Select sx={{ width: "300px" }} value={client} label="Client" onChange={(e) => setClient(e.target.value)}>
            {clients.map((client, i) => (
              <MenuItem value={client.id} key={i}>
                {client.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant="outlined" type="submit">
            Create Invoice
          </Button>
        </form>
      </FormControl>
      <Typography variant="h5">Add Items:</Typography>
      <InvoiceItemForm setInvoiceItems={setInvoiceItems} />
      {invoiceItems.map((item, i) => (
        <InvoiceItemCard invoiceItem={item} index={i} invoiceItems={invoiceItems} setInvoiceItems={setInvoiceItems} />
      ))}
    </>
  )
}

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { formateDate, convertGenre } from "../helpers"
import "./fav.css"
import NavBar from "./NavBar"

export default function Fav() {
  const location = useLocation()
  const favourites = location.state

  useEffect(() => {
    console.log(favourites)
  }, [favourites]) // Add favourites to dependency array for useEffect

  return (
    <div>
      <NavBar />
      <button className="Back" onClick={() => window.history.back()}>
        Back
      </button>
      {favourites ? ( // Check if favourites is not null or undefined
        favourites.map((show) => (
          <div key={show.id} className="episode">
            <img src={show.image} alt={show.title} />
            <div className="episode-details">
              <h3>{show.title}</h3>
              <p>Seasons: {show.seasons}</p>
              <p>Genres: {convertGenre(show.genres)}</p>
              <p>Last Updated: {formateDate(show.updated)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading favourites...</p> // Display a loading message while favourites are being fetched
      )}
    </div>
  )
}
