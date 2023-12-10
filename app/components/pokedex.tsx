'use client'

import { Button, ButtonGroup, Card, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import PokeCard from "./card"

export default function Pokedex({ slug }) {
  const [versionGroups, setVersionGroups] = useState([])
  const [version, setVersion] = useState({name: '', url: ''})
  const [pokedex, setPokedex] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      setVersionGroups(data.version_groups)
      setVersion(data.version_groups[0])
      // console.log(data.version_groups[0].url)
      fetch(data.version_groups[0].url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.pokedexes)
        fetch(data.pokedexes[0].url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.pokemon_entries)
          setPokedex(data.pokemon_entries)
        })
      })
    })
  }, [])

  useEffect(() => {
    fetch(version.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.pokedexes.find((dex)  => dex.name === version.name))
      })
  }, [version])

  // console.log(pokedex)
  // console.log(version)

  return (
    <>
      {/* <Typography>{}</Typography> */}
      <Tabs value={version.name}>
        {versionGroups.map((versionGroup) => 
          <Tab
            key={versionGroup.name}
            onClick={() => {
              // console.log(versionGroup.url)
              setVersion(versionGroup)
            }}
            value={versionGroup.name}
            label={versionGroup.name}
          />
        )}
      </Tabs>
      <Stack direction='row' flexWrap='wrap' useFlexGap gap={3} justifyContent='center'>
        {pokedex.map((pokemon) => 
          <PokeCard pokemon={pokemon} version={version} key={pokemon.entry_number} />
        )}
      </Stack>
      {/* {console.log(pokedex.descriptions[0].description)} */}
      {/* <Typography>{pokedex.descriptions[0].description}</Typography> */}
    </>
  )
}