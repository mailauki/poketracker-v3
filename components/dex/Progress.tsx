'use client'

import { useState } from "react"
import { Box, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material"

export default function Progress() {
  const [progress, setProgress] = useState(67.4)
  const matches = useMediaQuery('(max-width: 700px)')

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
          // direction={{ xs: 'column', sm: 'row' }}
        >
          {matches ? (
            <Typography variant="overline" color="secondary.contrastText">
              <b>{progress}%</b> DONE!
            </Typography>
          ) : (
            <Typography variant="overline" color="secondary.contrastText">
              <b>{progress}%</b> DONE!
              (<b>408</b> CAUGHT, <b>197</b> TO GO)
            </Typography>
          )}
        </Stack>
        {matches && (
          <Typography variant="overline">
            (<b>408</b> CAUGHT, <b>197</b> TO GO)
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