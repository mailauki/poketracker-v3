// 'use client'

import { Stack } from "@mui/material"
import DexForm from "./DexForm"
import DexCard from "./DexCard"

export default function DexContainer({ pokedexes }: { pokedexes: any }) {
  return (
    <Stack spacing={6} sx={{ mt: 3 }}>
      {pokedexes?.map((dex: any) => (
        <DexCard
          key={dex.id}
          dex={dex}
        />
      ))}
    
      <DexForm />
    </Stack>
  )
}