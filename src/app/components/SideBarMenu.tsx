"use client";

import { Typography, Box, Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import SiteLogo from "./SiteLogo";

const SideBarMenu = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box
      sx={{
        bgcolor: "lightblue",
        width: { lg: "300px", md: "100px", sm: "100px", xs: "100px" },
        pt: 2,
      }}
    >
      <SiteLogo color="blue" bgcolor="lightblue"></SiteLogo>
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
                  display: { lg: "block", md: "none", sm: "none", xs: "none" },
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
          <a href="/api/auth/logout">
            <Button>
              <Typography>Logout</Typography>
            </Button>
          </a>
        </>
      ) : (
        <a href="/api/auth/login">
          <Button>
            <Typography>Login</Typography>
          </Button>
        </a>
      )}
    </Box>
  );
};

export default SideBarMenu;
