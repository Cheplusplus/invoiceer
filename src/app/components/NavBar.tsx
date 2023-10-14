"use client"
import { Typography, Link } from "@mui/material"
import { usePathname } from "next/navigation"
import React from "react"

interface NavBarProps {
  navItems: [string, string][]
  style: {}
}
const NavBar = ({ navItems, style }: NavBarProps) => {
  const pathname = usePathname()
  return (
    <nav style={style}>
      {navItems.map((item, i) => {
        return (
          <Link
            href={item[1]}
            key={i}
            sx={{
              mt: "20px",
              mx: "auto",

              textDecoration: "none",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "24px",
                textAlign: "left",
                pl: "90px",
                borderBottom: "1px solid lightgrey",
                ":hover": { bgcolor: "#387597" },
              }}
              style={pathname === item[1] ? { backgroundColor: "#76a8c4" } : {}}
              key={i}
            >
              {item[0]}
            </Typography>
          </Link>
        )
      })}
    </nav>
  )
}

export default NavBar
