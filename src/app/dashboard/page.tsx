import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import DashboardPage from "../pages/DashboardPage"

const Home = async () => {
  return <DashboardPage />
}

export default withPageAuthRequired(Home, { returnTo: "/dashboard" })
