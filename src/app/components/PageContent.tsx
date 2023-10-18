import { Paper } from "@mui/material"
import DocumentControls from "./DocumentControls"

const PageContent = () => {
  return (
    <>
      <Paper
        sx={{
          maxWidth: "921px",
          maxHeight: "90vh",
          aspectRatio: "210/280",
          bgcolor: "white",
          m: "auto",
          position: "relative",
          top: { lg: "50%", md: "50px", sm: "10px", xs: "5px" },
          transform: {
            lg: "translateY(-50%)",
            md: '"translateY(0)"',
            sm: '"translateY(0)"',
            xs: "translateY(0)",
          },
        }}
        elevation={16}
      >
        Something
      </Paper>
    </>
  )
}

export default PageContent
