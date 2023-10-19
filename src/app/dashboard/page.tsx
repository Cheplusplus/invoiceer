import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import DashboardPage from "../components/dashboard/DashboardPage"

const Home = async () => {
  return <DashboardPage />
}

export default withPageAuthRequired(Home, { returnTo: "/dashboard" })
