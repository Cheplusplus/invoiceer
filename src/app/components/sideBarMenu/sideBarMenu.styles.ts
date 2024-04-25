export const styles = {
  container: {
    bgcolor: "lightblue",
    minWidth: { lg: "300px", md: "25px", sm: "25px", xs: "100px" },
    pt: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "-20px",
  },

  welcomeText: {
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
  },

  userImage: {
    borderRadius: "50%",
    margin: "16px",
    width: "32px",
    height: "32px",
  },

  navContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    textAlign: "justify",
    mt: "30px",
    width: "100%",
  },

  navLink: {
    mt: "20px",
    mx: "auto",
    textDecoration: "none",
  },

  navText: {
    color: "white",
    fontSize: "24px",
    textAlign: "left",
    pl: "90px",
    borderBottom: "1px solid lightgrey",
    ":hover": { bgcolor: "#387597" },
  },

  logoutButton: { m: "0 auto", width: "60%" },
  loginButton: { m: "0 auto", width: "60%" },
}
