'use client'

import { useState } from "react"
import { LinearProgress, Link as Anchor, Stack, Box, IconButton, Chip, Typography } from "@mui/material"
import { Edit, Star } from "@mui/icons-material"
import { hyphenate } from "@/utils/helper"

interface Dex {
  dex: {
    id: number,
    title: string,
    game: string,
    type: string,
    shiny: boolean,
    user: string,
    user_id: string
  }
}

export default function DexCard({ dex }: Dex) {
  const [progress, setProgress] = useState(67.4)

  return (
    <Stack spacing={1}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Anchor variant="h5" href={`/${hyphenate(dex.title)}`}>{dex.title || 'Dex Title'}</Anchor>
          <IconButton size='small'>
            <Edit fontSize='small' />
          </IconButton>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          {dex.shiny && <Star fontSize="small" color="error" />}
          <Chip label={dex.type || 'Dex Type'} />
          {/* <Chip label='Customization' /> */}
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
          >
            <Typography variant="overline" color="secondary.contrastText">
              <b>{progress}%</b> DONE! (<b>408</b> CAUGHT, <b>197</b> TO GO)
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