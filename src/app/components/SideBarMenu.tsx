"use client";

import { Typography, Box, Button, Link } from "@mui/material";
import SiteLogo from "./SiteLogo";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Invoices", "/invoices"],
  ["Clients", "/clients"],
  ["Profile", "/profile"],
];

const SideBarMenu = () => {
  const { user, error, isLoading } = useUser();
  const pathname = usePathname();

  if (error) return <div>{error.message}</div>;

  return (
    <Box
      sx={{
        bgcolor: "lightblue",
        width: { lg: "300px", md: "100px", sm: "100px", xs: "100px" },
        pt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <SiteLogo color="#387597" bgcolor="lightblue"></SiteLogo>
      {!isLoading ? (
        <>
          {user ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  top: "-20px",
                }}
              >
                {user.nickname && (
                  <Typography
                    sx={{
                      textAlign: "center",
                      py: 2,
                      display: {
                        lg: "block",
                        md: "none",
                        sm: "none",
                        xs: "none",
                      },
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    Welcome, {user.nickname}
                  </Typography>
                )}
                {user.picture && (
                  <img
                    style={{
                      borderRadius: "50%",
                      margin: "16px",
                      width: "32px",
                      height: "32px",
                    }}
                    src={user.picture}
                  />
                )}
              </Box>

              <Button
                href="/api/auth/logout"
                sx={{ m: "0 auto", width: "60%" }}
                variant="outlined"
              >
                <Typography>Logout</Typography>
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  textAlign: "justify",
                  mt: "30px",
                  width: "100%",
                }}
              >
                <nav
                  style={{
                    width: "100%",
                  }}
                >
                  {navItems.map((item, i) => {
                    return (
                      <Link
                        href={item[1]}
                        sx={{
                          mt: "20px",
                          mx: "auto",

                          textDecoration: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "24px",
                            textAlign: "left",
                            pl: "90px",
                            borderBottom: "1px solid lightgrey",
                            ":hover": { bgcolor: "#387597" },
                          }}
                          style={
                            pathname === item[1]
                              ? { backgroundColor: "#76a8c4" }
                              : {}
                          }
                          key={i}
                        >
                          {item[0]}
                        </Typography>
                      </Link>
                    );
                  })}
                </nav>
              </Box>
            </>
          ) : (
            <Button
              href="/api/auth/login"
              sx={{ m: "0 auto", width: "60%" }}
              variant="outlined"
            >
              <Typography>Login</Typography>
            </Button>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default SideBarMenu;
