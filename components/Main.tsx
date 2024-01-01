'use client'

import styles from "../app/page.module.css"
import { Box, Toolbar } from "@mui/material"

export default function Main({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.main}>
      <Toolbar />
      {children}
    </main>
  )
}