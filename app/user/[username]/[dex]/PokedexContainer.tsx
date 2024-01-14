'use client'

import { Container } from "@mui/material"
import PokedexTabs from "./PokedexTabs"
import { useEffect, useState } from "react"
import Pokedex from "./Pokedex"
import { Captured, PokedexTab } from "@/utils/types"
import Loading from "@/app/loading"
import LoadingSkeleton from "../../../../components/LoadingSkeleton"
import { createClient } from "@/utils/supabase/client"

export default function PokedexContainer({
  pokedexes, captured
}: {
  pokedexes: PokedexTab,
  captured: Captured
}) {
  const [active, setActive] = useState(pokedexes[0].id)
  const [pokedexEntries, setPokedexEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActive(newValue)
    setLoading(true)
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${active}`)
    .then((res) => res.json())
    .then((data) => {
      setPokedexEntries(data.pokemon_entries)
      setLoading(false)
    })
  }, [active])

  return (
    <Container maxWidth='md'>
      <PokedexTabs
        pokedexes={pokedexes}
        active={active}
        handleChangeTab={handleChangeTab}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Pokedex pokedexEntries={pokedexEntries} captured={captured} />
      )}
    </Container>
  )
}