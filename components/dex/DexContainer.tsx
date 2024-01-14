// 'use client'

import { Stack } from "@mui/material"
import DexForm from "./DexForm"
import DexCard from "./DexCard"
import { Dex } from "@/utils/types"

export default function DexContainer({ pokedexes }: { pokedexes: any }) {
  return (
    <Stack spacing={6} sx={{ mt: 3 }}>
      {pokedexes?.map((dex: Dex) => (
        <DexCard
          key={dex.id}
          dex={dex}
        />
      ))}
    
      {/* <DexForm /> */}
    </Stack>
  )
}