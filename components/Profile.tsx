'use client'

import { Container, Stack, Typography } from '@mui/material'
import DexForm from './DexForm'
import DexCard from './DexCard'

export default function Profile() {
  return (
    <Container maxWidth='sm'>
      <Stack spacing={4}>
        <Typography textAlign='center'>{'-> dexes go here <-'}</Typography>
        <DexCard />

        <DexForm />
      </Stack>
    </Container>
  )
}