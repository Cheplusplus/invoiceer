/**
 *  Component layout:
 *
 *  -> ClientsPage - Gets all user saved clients from server
 *    -> ClientsForm
 *    -> ClientsList - Accepts a list
 *      -> ClientCard
 *
 */

import ClientsList from "./ClientsList"
import { getAllClients } from "../../actions/actions"
import { Box, Paper, Typography } from "@mui/material"
import ClientsForm from "./ClientsForm"

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
      <Typography variant="h1">Clients</Typography>
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
