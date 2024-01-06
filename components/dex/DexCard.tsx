'use client'

import { useEffect, useState } from "react"
import { LinearProgress, Link as Anchor, Stack, Box, IconButton, Chip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Edit, Star } from "@mui/icons-material"
import { adjustName, hyphenate } from "@/utils/helper"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Database } from "@/utils/types"

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
  const pathname = usePathname()
  // console.log(pathname)
  const supabase = createClient()
  const router = useRouter()
  const matches = useMediaQuery('(max-width: 700px)')
  // const theme = useTheme()
  // const matches = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pokedexes' }, () =>
        router.refresh()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router, supabase])

  return (
    <Stack spacing={1}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Anchor
            variant="h5"
            noWrap
            href={`${pathname}/${hyphenate(dex.title)}`}
          >
            {dex.title || 'Dex Title'}
          </Anchor>
          <IconButton size='small'>
            <Edit fontSize='small' />
          </IconButton>
        </Stack>

        {!matches && (
          <Stack direction='row' alignItems='center' spacing={1} flexWrap='wrap' useFlexGap justifyContent='flex-end'>
            {dex.shiny && <Star fontSize="small" color="error" />}
            <Chip label={dex.type || 'Dex Type'} />
            <Chip label={adjustName(dex.game) || 'Game'} />
          </Stack>
        )}
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
            direction={{ xs: 'column', sm: 'row' }}
          >
            {matches ? (
              <Typography variant="overline" color="secondary.contrastText">
                <b>{progress}%</b> DONE!
              </Typography>
            ) : (
              <Typography variant="overline" color="secondary.contrastText">
                <b>{progress}%</b> DONE! (<b>408</b> CAUGHT, <b>197</b> TO GO)
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
    </Stack>
  )
}