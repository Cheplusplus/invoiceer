import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import ClientsPage from "./ClientsPage"

const Home = async () => {
  return <ClientsPage />
}

export default withPageAuthRequired(Home, { returnTo: "/clients" })
