'use client'

import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { lime } from '@mui/material/colors'
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
          primary: lime
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