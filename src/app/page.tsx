"use client";
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  user ? redirect("/home") : null;
  return <div>Hi</div>;
};

export default Home;
