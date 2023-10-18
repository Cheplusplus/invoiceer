import { UserProvider } from "@auth0/nextjs-auth0/client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Container, Box } from "@mui/material"
import SideBarMenu from "./components/SideBarMenu"
import { getSession } from "@auth0/nextjs-auth0"
import prisma from "./db"
import Head from "next/head"
import "../app/globals.css"
import { createUser, getAppUser } from "./actions/actions"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invoiceer",
  description: "Next Best Invoicing App",
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  const user = session?.user || null

  if (user) {
    const appUser = await getAppUser()

    if (!appUser) {
      await createUser({
        id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
      })
    }
  }

  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="/src/app/globals.css" />
      </Head>
      <UserProvider>
        <body style={{ padding: "0", margin: "0", height: "100%" }} className={inter.className}>
          <Box
            sx={{
              bgcolor: "snow",
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
              p: 0,
              m: 0,
              mr: "48px",
            }}
          >
            <SideBarMenu />
            <Container
              sx={{
                height: "100vh",
              }}
            >
              {children}
            </Container>
          </Box>
        </body>
      </UserProvider>
    </html>
  )
}

export default RootLayout
