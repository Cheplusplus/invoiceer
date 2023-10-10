"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

const Home = () => {
  const { user, error, isLoading } = useUser();
  user ? redirect("/home") : null;

  return <></>;
};

export default Home;
