import { Box, Typography } from "@mui/material";
import React from "react";

interface SiteLogoProps {
  color: string;
  bgcolor: string;
}
const SiteLogo = ({ color, bgcolor }: SiteLogoProps) => {
  return (
    <Box
      sx={{
        maxWidth: "280px",
        display: { lg: "block", md: "none", sm: "none", xs: "none" },
        m: "0 auto",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          border: "2px solid white",
          borderColor: color,
          textAlign: "center",
          color: color,
          m: 2,
          zIndex: "1",
          fontSize: "3rem",
          padding: "10px",
        }}
      >
        Invoiceer
      </Typography>
      <Typography
        sx={{
          position: "relative",
          m: "auto",
          color: color,
          top: "-30px",
          bgcolor: bgcolor,
          zIndex: "99",
          width: "fit-content",
          fontSize: "0.8rem",
        }}
      >
        Simplify, Organize, Prosper
      </Typography>
    </Box>
  );
};

export default SiteLogo;
