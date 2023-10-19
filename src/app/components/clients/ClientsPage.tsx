import ClientsList from "./ClientsList"
import { getAllClients } from "../../actions/actions"
import { Box, Paper } from "@mui/material"
import ClientsForm from "./ClientsForm"

const ListItems = () => {
  return <></>
}

const ClientsPage = async () => {
  const clients = await getAllClients()

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 10,
        p: 4,
        height: "80vh",
      }}
      elevation={16}
    >
      <h1>Clients</h1>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ClientsForm></ClientsForm>
        <ClientsList clients={clients}></ClientsList>
      </Box>
    </Paper>
  )
}

export default ClientsPage
