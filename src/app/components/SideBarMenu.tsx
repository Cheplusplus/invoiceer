"use client";

import { Typography, Box, Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import SiteLogo from "./SiteLogo";

const SideBarMenu = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ bgcolor: "lightblue", width: "300px" }}>
      <SiteLogo color="blue" bgcolor="lightblue"></SiteLogo>
      {user ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {user.nickname && (
              <Typography
                sx={{
                  textAlign: "center",
                  py: 2,
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
          </div>
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
