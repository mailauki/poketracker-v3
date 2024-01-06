'use client'

import { Chip, Container, Link as Anchor, Stack, Typography, useMediaQuery, IconButton, Tooltip, Button, TextField } from "@mui/material"
import DexCard from "./dex/DexCard"
import Progress from "./dex/Progress"
import { adjustName } from "@/utils/helper"
import { Star, IosShare as Share } from "@mui/icons-material"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function DexHeader({ dex }: any) {
  const matches = useMediaQuery('(max-width: 700px)')
  const { username } = useParams()

  return (
    <Container maxWidth='md' sx={{ pt: 2, mb: 3 }}>
      <Stack spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography variant='h4' textAlign='center'>
              {dex.title}
            </Typography>
          </Stack>

          {!matches && (
            <Stack direction='row' alignItems='center' spacing={1} flexWrap='wrap' useFlexGap justifyContent='flex-end'>
              {dex!.shiny && <Star fontSize="small" color="error" />}
              <Chip label={dex!.type || 'Dex Type'} />
              <Chip label={adjustName(dex!.game) || 'Game'} />
            </Stack>
          )}
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Anchor component={Link} href={`/user/${username}`}>
            /user/{username}
          </Anchor>
          <Tooltip title={
            <Stack spacing={1} sx={{ p: 1 }}>
              <Typography>Share this Dex</Typography>
              <Button variant="contained">Copy Link</Button>
            </Stack>
          } arrow>
            <IconButton size="small">
              <Share fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Progress />
      </Stack>
    </Container>
  )
}