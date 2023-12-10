'use client'

import { Divider, Stack, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import PokeCard from "./card"

export default function Pokedexes({ slug }) {
  const [pokedexes, setPokedexes] = useState([])
  const [pokedex, setPokedex] = useState('')
  const [pokemonEntries, setPokemonEntries] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/version-group/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      setPokedexes(data.pokedexes)
      setPokedex(data.pokedexes[0].name)
      fetch(`https://pokeapi.co/api/v2/pokedex/${data.pokedexes[0].name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonEntries(data.pokemon_entries)
      })
    })
  }, [slug])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${pokedex}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemonEntries(data.pokemon_entries)
    })
  }, [pokedex])

  if(!pokemonEntries) return <h1>Loading...</h1>

  return (
    <>
      <Tabs value={pokedex}>
        {pokedexes.map((pokedex) => 
          <Tab
            key={pokedex.name}
            onClick={() => {
              setPokedex(pokedex.name)
            }}
            value={pokedex.name}
            label={pokedex.name}
          />
        )}
      </Tabs>
      <Divider sx={{ mb: 2 }} />
      <Stack direction='row' flexWrap='wrap' useFlexGap gap={3} justifyContent='center'>
        {pokemonEntries.map((pokemon) => 
          <PokeCard
            key={pokemon.entry_number}
            pokemon={pokemon}
            version={pokedex}
          />
        )}
      </Stack>
    </>
  )
}