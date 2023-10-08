import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <body style={{ padding: "0", margin: "0" }} className={inter.className}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
