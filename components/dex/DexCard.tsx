'use client'

import { useState } from "react"
import { LinearProgress, Link as Anchor, Stack, Box, IconButton, Chip, Typography } from "@mui/material"
import { Edit, Star } from "@mui/icons-material"

export default function DexCard() {
  const [progress, setProgress] = useState(67.4)

  return (
    <Stack spacing={1}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Anchor variant="h5">Dex Name</Anchor>
          <IconButton size='small'>
            <Edit fontSize='small' />
          </IconButton>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          <Star fontSize="small" color="error" />
          <Chip label='Dex Type' />
          <Chip label='Customization' />
        </Stack>
      </Stack>

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
            // sx={{ mixBlendMode: 'exclusion' }}
          >
            <Typography variant="overline" color="secondary.contrastText">
              {`${progress}% DONE! (408 CAUGHT, 197 TO GO)`}
            </Typography>
          </Stack>
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
    </Stack>
  )
}