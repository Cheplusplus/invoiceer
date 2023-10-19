import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import InvoicesPage from "../components/invoices/InvoicesPage"

const Home = async () => {
  return <InvoicesPage />
}

export default withPageAuthRequired(Home, { returnTo: "/invoices" })
