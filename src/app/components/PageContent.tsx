import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import SiteLogo from "./SiteLogo";
import DocumentControls from "./DocumentControls";

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
          top: "50%",
          transform: "translateY(-50%)",
        }}
        elevation={24}
      ></Paper>
      <DocumentControls></DocumentControls>
    </>
  );
};

export default PageContent;
