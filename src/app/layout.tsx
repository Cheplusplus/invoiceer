import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Box } from "@mui/material";
import SideBarMenu from "./components/SideBarMenu";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import prisma from "./db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoiceer",
  description: "Next Best Invoicing App",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user || null;

  if (user) {
    const appUser = await prisma.user.findUnique({
      where: { id: user.sub },
    });
    console.log(appUser);
    if (!appUser) {
      await prisma.user.create({
        data: {
          id: user.sub,
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
      });
    }
  }

  return (
    <html lang="en">
      <UserProvider>
        <body
          style={{ padding: "0", margin: "0", height: "100%" }}
          className={inter.className}
        >
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
  );
};

export default RootLayout;
