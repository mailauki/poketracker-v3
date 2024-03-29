'use client'

import { useEffect, useState } from "react"
import { LinearProgress, Link as Anchor, Stack, Box, IconButton, Chip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Edit, Star } from "@mui/icons-material"
import { adjustName, hyphenate } from "@/utils/helper"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Database, Dex, DexProps } from "@/utils/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Loading from "@/app/loading"
import Progress from "./Progress"
import { getPokedexTabs } from "@/app/api/actions"

export default function DexCard({ dex }: DexProps) {
  const [progress, setProgress] = useState(67.4)
  const pathname = usePathname()
  // console.log(pathname)
  // const supabase = createClient()
  const supabase = createClientComponentClient<Database>()
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

  // useEffect(() => {
  //   // fetch(`https://pokeapi.co/api/v2/version-group/${dex?.game}`)
  //   // .then((res) => res.json())
  //   // .then((data) => {
  //   //   console.log(data.pokedexes)
  //   // })
  //   fetch(`https://pokeapi.co/api/v2/pokedex/${28 || 1}`)
  //   .then((res) => res.json())
  //   .then((dat) => console.log(dat.pokemon_entries.length))
  // }, [dex])

  if (!dex) return <Loading />
  // console.log(dex)

  return (
    <Stack spacing={1} sx={{ width: '100%', height: '100%' }}>
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Anchor
            variant="h5"
            noWrap
            href={`${pathname}/${dex.hash}`}
          >
            {dex!.title || 'Dex Title'}
          </Anchor>
          <IconButton size='small' disabled>
            <Edit fontSize='small' />
          </IconButton>
        </Stack>

        {!matches && (
          <Stack direction='row' alignItems='center' spacing={1} flexWrap='wrap' useFlexGap justifyContent='flex-end'>
            {dex!.shiny && <Star fontSize="small" color="error" />}
            <Chip label={dex!.type || 'Dex Type'} />
            <Chip label={adjustName(dex!.game) || 'Game'} />
          </Stack>
        )}
      </Stack>

      <Progress captured={dex!.captured} entries={dex!.entries} />
    </Stack>
  )
}