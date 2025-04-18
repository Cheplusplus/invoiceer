import { Typography, Box, Button } from "@mui/material"
import SiteLogo from "../siteLogo/SiteLogo"
import { getUser } from "../../actions/actions"
import NavBar from "./NavBar"
import { styles } from "./sideBarMenu.styles"

const navItems: [string, string][] = [
  ["Dashboard", "/dashboard"],
  ["Invoices", "/invoices"],
  ["Clients", "/clients"],
  ["Profile", "/profile"],
]

const SideBarMenu = async () => {
  const user = await getUser()

  const LoggedInState = () => {
    return (
      <>
        <Box sx={styles.content}>
          <>
            {user?.nickname && <Typography sx={styles.welcomeText}>Welcome, {user.nickname}</Typography>}
            {user?.picture && <img style={styles.userImage} src={user.picture} />}
          </>
        </Box>

        <Button href="/api/auth/logout" sx={styles.logoutButton} variant="outlined">
          <Typography>Logout</Typography>
        </Button>

        <Box sx={styles.navContainer}>
          <NavBar navItems={navItems}></NavBar>
        </Box>
      </>
    )
  }

  const LoggedOutState = () => {
    return (
      <Button href="/api/auth/login" sx={styles.loginButton} variant="outlined">
        <Typography>Login</Typography>
      </Button>
    )
  }

  /**
   * The Final returned JSX of the SideBarMenu component.
   */
  return (
    <Box sx={styles.container}>
      <>
        <SiteLogo color="#387597" bgcolor="lightblue"></SiteLogo>
        {user ? <LoggedInState /> : <LoggedOutState />}
      </>
    </Box>
  )
}

export default SideBarMenu
