import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import PageContent from "../components/PageContent";
import prisma from "../db";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  const user = session?.user || null;

  if (!user) redirect("/");

  const appUser = await prisma.user.findUnique({
    where: { id: user.sub },
  });

  return <PageContent user={appUser} />;
};

export default withPageAuthRequired(Home, { returnTo: "/home" });
