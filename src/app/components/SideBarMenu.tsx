"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Typography,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import SiteLogo from "./SiteLogo";

const navItems = [
  ["Dashboard", "#"],
  ["Invoices", "#"],
  ["Clients", "#"],
  ["Profile", "#"],
];

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <SiteLogo color="#387597" bgcolor="lightblue"></SiteLogo>
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
              textAlign: "center",
            }}
          >
            <nav>
              {navItems.map((item) => {
                return (
                  <Typography>
                    <Link href={item[1]}>{item[0]}</Link>
                  </Typography>
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
    </Box>
  );
};

export default SideBarMenu;
