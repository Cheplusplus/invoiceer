import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import SiteLogo from "./SiteLogo";

const PageContent = () => {
  return (
    <Paper
      sx={{
        maxWidth: "921px",
        height: "90vh",
        bgcolor: "white",
        m: "auto",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      elevation={24}
    ></Paper>
  );
};

export default PageContent;
