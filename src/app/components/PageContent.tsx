import { Container, Typography, Box, Paper } from "@mui/material";
import DocumentControls from "./DocumentControls";

interface PageContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    address1: string | null;
    address2: string | null;
    picture: string | null;
    createAt: Date;
    updatedAT: Date;
  } | null;
}

const PageContent = ({ user }: PageContentProps) => {
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
          top: "50%",
          transform: "translateY(-50%)",
        }}
        elevation={16}
      >
        {user?.name}
      </Paper>
      <DocumentControls></DocumentControls>
    </>
  );
};

export default PageContent;
