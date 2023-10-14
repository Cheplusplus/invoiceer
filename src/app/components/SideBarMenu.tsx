import { Typography, Box, Button } from "@mui/material"
import SiteLogo from "./SiteLogo"
import { getUser } from "../actions/actions"
import NavBar from "./NavBar"

const navItems: [string, string][] = [
  ["Dashboard", "/dashboard"],
  ["Invoices", "/invoices"],
  ["Clients", "/clients"],
  ["Profile", "/profile"],
]

const SideBarMenu = async () => {
  const user = await getUser()

  return (
    <>
      <Box
        sx={{
          bgcolor: "lightblue",
          minWidth: { lg: "300px", md: "25px", sm: "25px", xs: "100px" },
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

            <Button href="/api/auth/logout" sx={{ m: "0 auto", width: "60%" }} variant="outlined">
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
              <NavBar navItems={navItems} style={{ width: "100%" }}></NavBar>
            </Box>
          </>
        ) : (
          <Button href="/api/auth/login" sx={{ m: "0 auto", width: "60%" }} variant="outlined">
            <Typography>Login</Typography>
          </Button>
        )}
      </Box>
    </>
  )
}

export default SideBarMenu
