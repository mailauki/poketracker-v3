'use client'

import { Container, Stack, Typography } from '@mui/material'
import DexForm from './dex/DexForm'
import DexCard from './dex/DexCard'
import DexContainer from './dex/DexContainer'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Database } from '@/utils/types'

type Pokedex = Database['public']['Tables']['pokedexes']['Row']

export default function Profile({ username, pokedexes }: { username: string, pokedexes: any }) {
  const supabase = createClient()
  const router = useRouter()
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
    <Container maxWidth='sm' sx={{ pt: 2 }}>
      <Typography variant='h4' textAlign='center'>
        {`${username ? `${username}'s` : 'Your'} Account`}
      </Typography>

      {/* <Stack spacing={4}>
        <Typography textAlign='center'>
          {'-> dexes go here <-'}
        </Typography>

        <DexForm />
      </Stack> */}
      <DexContainer pokedexes={dexes} />
    </Container>
  )
}