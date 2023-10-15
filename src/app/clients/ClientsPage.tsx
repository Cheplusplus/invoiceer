import ClientsList from "./ClientsList"
import ClientsForm from "./ClientsForm"
import { getAllClients } from "../actions/actions"
import { Box } from "@mui/material"

const ClientsPage = async () => {
  const clients = await getAllClients()
  return (
    <Box
      sx={{
        display: "flex",
        mt: "100px",
      }}
    >
      <ClientsForm></ClientsForm>
      <ClientsList clients={clients}></ClientsList>
    </Box>
  )
}

export default ClientsPage
