"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { redirect } from "next/navigation"

const Home = () => {
  const { user, error, isLoading } = useUser()
  user ? redirect("/dashboard") : null
  return <>Uwuuuu :3</>
}

export default Home
