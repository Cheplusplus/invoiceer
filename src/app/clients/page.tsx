import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import ClientsPage from "../pages/ClientsPage"

const Home = async () => {
  return <ClientsPage />
}

export default withPageAuthRequired(Home, { returnTo: "/clients" })
