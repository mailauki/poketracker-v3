'use client'

import { Box, Container, Divider, Stack, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import PokeCard from "./PokeCard"
import { Pokedex, Pokemon } from "@/utils/types"
import Loading from "@/app/loading"

export default function Pokedexes({ game }: { game: string }) {
  const [pokedexes, setPokedexes] = useState<Array<Pokedex>>([])
  const [pokedex, setPokedex] = useState<string>('')
  const [pokemonEntries, setPokemonEntries] = useState<Array<Pokemon>>([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/version-group/${game}`)
    .then((res) => res.json())
    .then((data) => {
      setPokedexes(data.pokedexes)
      setPokedex(data.pokedexes[0].name)
      if (data.pokedexes[0].url.split("/")[6] === "31") {
        setPokedexes([
          {
            name: 'paldea',
            url: 'https://pokeapi.co/api/v2/pokedex/31'
          },
          {
            name: 'kitakami',
            url: 'https://pokeapi.co/api/v2/pokedex/32'
          },
          {
            name: 'blueberry',
            url: 'https://pokeapi.co/api/v2/pokedex/33'
          }
        ])
      }
      fetch(`https://pokeapi.co/api/v2/pokedex/${data.pokedexes[0].name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonEntries(data.pokemon_entries)
      })
    })
  }, [game])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokedex/${pokedex}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemonEntries(data.pokemon_entries)
    })
  }, [pokedex])

  if(!pokemonEntries) return <Loading />

  return (
    <Container maxWidth='md'>
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
          />
        )}
      </Stack>
    </Container>
  )
}