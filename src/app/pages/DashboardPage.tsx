import PageContent from "../components/PageContent"
import { Dispatch, SetStateAction } from "react"
import { Paper } from "@mui/material"
import { styles } from "../components/dashboard/dashboard.styles"

const DashboardPage = () => {
  return <Paper sx={styles.paper} elevation={16} />
}

export default DashboardPage
