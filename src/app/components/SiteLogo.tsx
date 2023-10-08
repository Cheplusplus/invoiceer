import { Box, Typography } from "@mui/material";
import { Content } from "next/font/google";
import React from "react";

interface SiteLogoProps {
  color: string;
  bgcolor: string;
}
const SiteLogo = ({ color, bgcolor }: SiteLogoProps) => {
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <Typography
        variant="h2"
        sx={{
          border: "2px solid white",
          borderColor: color,
          textAlign: "center",
          color: color,
          m: 2,
          zIndex: "1",
        }}
      >
        Invoiceer
      </Typography>
      <Typography
        sx={{
          position: "relative",
          ml: "25%",
          color: color,
          top: "-30px",
          bgcolor: bgcolor,
          zIndex: "99",
          width: "fit-content",
        }}
      >
        Simplify, Organize, Prosper
      </Typography>
    </Box>
  );
};

export default SiteLogo;
