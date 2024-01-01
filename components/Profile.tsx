'use client'

import { Container, Stack, Typography } from '@mui/material'
import DexForm from './dex/DexForm'
import DexCard from './dex/DexCard'

export default function Profile({ username }: { username: string }) {
  return (
    <Container maxWidth='sm' sx={{ pt: 2 }}>
      <Typography variant='h4' textAlign='center'>
        {`${username ? `${username}'s` : 'Your'} Account`}
      </Typography>

      <Stack spacing={4}>
        <Typography textAlign='center'>
          {'-> dexes go here <-'}
        </Typography>
        <DexCard />

        <DexForm />
      </Stack>
    </Container>
  )
}