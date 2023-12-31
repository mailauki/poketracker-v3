'use client'

import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { lime, purple } from '@mui/material/colors'
import { useMemo } from 'react'

export default function Theme({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          // primary: lime,
          primary: {
            main: purple[500]
          },
          secondary: {
            main: lime[500]
          }
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}