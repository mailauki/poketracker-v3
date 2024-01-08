'use client'

import { useEffect, useState } from "react"
import { Box, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material"

export default function Progress({ captured, entries }: { captured: number, entries: number }) {
  const [progress, setProgress] = useState<number>(0)
  const matches = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    const percent = ((captured/entries) * 100)
    if(String(percent).includes('.')) {
      setProgress(Number(percent.toFixed(2)))
    } else {
      setProgress(percent)
    }
  }, [captured, entries])

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          width='100%'
          height='100%'
        >
          {matches ? (
            <Typography variant="overline" color="secondary.contrastText">
              <b>{progress}%</b> DONE!
            </Typography>
          ) : (
            <Typography variant="overline" color="secondary.contrastText">
              <b>{progress}%</b> DONE!
              (<b>{captured}</b> CAUGHT, <b>{entries-captured}</b> TO GO)
            </Typography>
          )}
        </Stack>
        {matches && (
          <Typography variant="overline">
            (<b>{captured}</b> CAUGHT, <b>{entries-captured}</b> TO GO)
          </Typography>
        )}
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        color="secondary"
        sx={{
          height: 30,
          borderRadius: (theme) => theme.shape.borderRadius,
          zIndex: 0
        }}
      />
    </Box>
  )
}