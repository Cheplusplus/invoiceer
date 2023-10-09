import { Container, Typography, Box, Paper, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";

const sidebarIcons = [
  [<DownloadIcon />],
  [<EditIcon />],
  [<ContentCopyIcon />],
  [<SaveIcon />],
];

const DocumentControls = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        bgcolor: "#D4D4D4",
        width: "48px",
        position: "fixed",
        top: "0",
        right: "0",
        height: "100vh",
        pt: 4,
      }}
    >
      {sidebarIcons.map((icon, i) => (
        <Button
          key={i}
          variant="outlined"
          sx={{
            minWidth: "0",
            maxWidth: "fit-content",
            p: 0,
            m: "0 auto",
            mt: 4,
            color: "#646464",
            borderColor: "#646464",
          }}
        >
          {icon}
        </Button>
      ))}
    </Box>
  );
};

export default DocumentControls;
