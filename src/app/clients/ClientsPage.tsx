"use server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../db";

const ClientsPage = async () => {
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

export default ClientsPage;
