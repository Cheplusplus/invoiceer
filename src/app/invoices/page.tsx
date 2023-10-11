import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import InvoicesPage from "./InvoicesPage";

const Home = async () => {
  return <InvoicesPage />;
};

export default withPageAuthRequired(Home, { returnTo: "/invoices" });
