"use server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../db";

interface User {
  id: string;
  name: string;
  email: string;
  address1: string | null;
  address2: string | null;
  picture: string | null;
  createAt: Date;
  updatedAT: Date;
}

const ClientsPage = async () => {
  const session = await getSession();
  const user = session?.user || null;

  if (user) {
    const appUser: User | null = await prisma.user.findUnique({
      where: { id: user.sub },
    });

    if (!appUser) return <></>;

    // await prisma.client.create({
    //   data: {
    //     userID: appUser.id,
    //     name: "John Smith",
    //     email: "john.s@gmail.com",
    //     address1: "This place",
    //     address2: "The other place",
    //   },
    // });
  }
  const clients = await prisma.client.findMany({
    where: { userID: user?.sub },
  });

  return (
    <>
      {clients.map((client) => {
        return client.name;
      })}
    </>
  );
};

export default ClientsPage;
