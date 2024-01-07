'use client'

import styles from "../app/page.module.css"
import { Box, Paper, Toolbar } from "@mui/material"

export default function Main({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      component="main"
      className={styles.main}
      // square
      // elevation={0}
    >
      <Toolbar />
      {children}
    </Box>
  )
}