'use client'

import { ThemeProvider, createTheme } from '@mui/material'
import { lime, purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple
  }
})

export default function Theme({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}