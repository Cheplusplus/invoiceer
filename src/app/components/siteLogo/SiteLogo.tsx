import { Box, Typography, Link } from "@mui/material"
import React from "react"
import { styles } from "./siteLogo.styles"

interface SiteLogoProps {
  color: string
  bgcolor: string
}
const SiteLogo = ({ color, bgcolor }: SiteLogoProps) => {
  return (
    <Link href="/" sx={styles.link}>
      <Box sx={styles.container}>
        <>
          <Typography variant="h2" sx={{ ...styles.logoText, borderColor: color, color: color }}>
            Invoiceer
          </Typography>
          <Typography sx={{ ...styles.sloganText, bgcolor: bgcolor, color: color }}>
            Simplify, Organize, Prosper
          </Typography>
        </>
      </Box>
    </Link>
  )
}

export default SiteLogo
