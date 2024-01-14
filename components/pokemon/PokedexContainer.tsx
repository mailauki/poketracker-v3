'use client'

import { Container } from "@mui/material"
import PokedexTabs from "./PokedexTabs"
import { useEffect, useState } from "react"
import Pokedex from "./Pokedex"
import { Captured } from "@/utils/types"

export default function PokedexContainer({
  pokedexes, captured
}: {
  pokedexes: { id: number, name: string }[],
  captured: Captured
}) {
  const [active, setActive] = useState(pokedexes[0].id)
  const [pokedexEntries, setPokedexEntries] = useState([])

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActive(newValue)
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${active}`)
    .then((res) => res.json())
    .then((data) => setPokedexEntries(data.pokemon_entries))
  }, [active])

  return (
    <Container maxWidth='md'>
      <PokedexTabs
        pokedexes={pokedexes}
        active={active}
        handleChangeTab={handleChangeTab}
      />

      <Pokedex pokedexEntries={pokedexEntries} captured={captured} />
    </Container>
  )
}