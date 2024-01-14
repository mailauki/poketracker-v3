'use client'

import { Button, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import DexForm from './DexForm'
import DexCard from './DexCard'
import DexContainer from './DexContainer'
import { createClient } from '@/utils/supabase/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Database, Dex } from '@/utils/types'
import { IosShare as Share } from '@mui/icons-material'

type Pokedex = Database['public']['Tables']['pokedexes']['Row']

export default function Profile({ username, pokedexes }: { username: string, pokedexes: Dex[] | null }) {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const [dexes, setDexes] = useState(pokedexes)

  useEffect(() => {
    setDexes(pokedexes)
  }, [pokedexes])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pokedexes' }, (payload) =>
        setDexes((dexes: any) => [...dexes, payload.new as Pokedex])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router, supabase])

  return (
    <Container maxWidth='md' sx={{ pt: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant='h4' textAlign='center'>
          {`${username ? `${username}'s` : 'Your'} Profile`}
        </Typography>
        <Tooltip title={
          <Stack spacing={1} sx={{ p: 1 }}>
            <Typography>Share this Profile</Typography>
            <Button
              variant="contained"
              onClick={() => console.log(`https://poketracker-v3.vercel.app${pathname}`)}
            >
              Copy Link
            </Button>
          </Stack>
        } arrow>
          <IconButton size="small">
            <Share fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <DexContainer dexes={dexes} />
    </Container>
  )
}