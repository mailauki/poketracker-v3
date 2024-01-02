'use client'

import { Container, Stack, Typography } from '@mui/material'
import DexForm from './dex/DexForm'
import DexCard from './dex/DexCard'
import DexContainer from './dex/DexContainer'

export default function Profile({ username, pokedexes }: { username: string, pokedexes: any }) {
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
      <DexContainer pokedexes={pokedexes} />
    </Container>
  )
}