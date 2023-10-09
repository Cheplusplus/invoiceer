import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Box } from "@mui/material";
import SideBarMenu from "./components/SideBarMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoiceer",
  description: "Next Best Invoicing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          style={{ padding: "0", margin: "0", height: "100%" }}
          className={inter.className}
        >
          <main>
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
              <SideBarMenu></SideBarMenu>
              <Container
                sx={{
                  height: "100vh",
                }}
              >
                {children}
              </Container>
            </Box>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
