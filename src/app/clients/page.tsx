import prisma from "../db";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
// import { withApiAuthRequired } from "@auth0/nextjs-auth0/client";

const Home = async () => {
  const session = await getSession();
  const user = session?.user || null;
  const clients = await prisma.client.findMany({
    where: { userID: user?.sub },
  });
  return (
    <>
      {clients.map((client) => {
        client.name;
      })}
    </>
  );
};

export default withPageAuthRequired(Home, { returnTo: "/clients" });
