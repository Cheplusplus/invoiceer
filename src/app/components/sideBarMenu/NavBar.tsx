"use client"
import { Typography, Link } from "@mui/material"
import { usePathname } from "next/navigation"
import React from "react"
import { styles } from "./sideBarMenu.styles"

interface NavBarProps {
  navItems: [string, string][]
}
const NavBar = ({ navItems }: NavBarProps) => {
  const pathname = usePathname()
  return (
    <nav style={{ width: "100%" }}>
      {navItems.map((item, i) => {
        return (
          <Link href={item[1]} key={i} sx={styles.navLink}>
            <Typography
              sx={pathname === item[1] ? { ...styles.navText, backgroundColor: "#76a8c4" } : styles.navText}
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
