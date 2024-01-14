'use client'

import PokeCard from "./PokeCard"
import { Captured, Pokemon } from "@/utils/types"
import { Stack } from "@mui/material"

export default function Pokedex({
  pokedexEntries, captured
}: {
  pokedexEntries: any,
  captured: Captured
}) {
  return (
    <Stack
      direction='row'
      flexWrap='wrap'
      useFlexGap
      gap={3}
      justifyContent='center'
    >
      {pokedexEntries.map((pokemon: Pokemon) =>
        <PokeCard
          key={pokemon.entry_number}
          pokemon={pokemon}
          captured={captured}
        />
      )}
    </Stack>
  )
}