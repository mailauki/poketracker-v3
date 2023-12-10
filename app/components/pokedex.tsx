'use client'

import { Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function Pokedex({ slug }) {
  const [versionGroups, setVersionGroups] = useState([])
  const [version, setVersion] = useState('')
  const [pokedex, setPokedex] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      setVersionGroups(data.version_groups)
      console.log(data.version_groups[0].url)
      fetch(data.version_groups[0].url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.pokedexes[0].url)
        fetch(data.pokedexes[0].url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.pokemon_entries)
          setPokedex(data.pokemon_entries)
        })
      })
    })
  }, [])

  // useEffect(() => {
  //   f
  // }, [version])

  console.log(pokedex)
  console.log(version)

  return (
    <>
      {/* <Typography>{}</Typography> */}
      {versionGroups.map((versionGroup) => 
        <Button
          key={versionGroup.name}
          onClick={() => {
            // console.log(versionGroup.url)
            setVersion(versionGroup.url)
          }}
        >
          {versionGroup.name}
        </Button>
      )}
      <Stack direction='row' flexWrap='wrap' useFlexGap gap={3} justifyContent='center'>
        {pokedex.map((pokemon) => 
          <Card sx={{ width: 200 }} key={pokemon.entry_number}>
            <CardContent>
              <Typography>
                {pokemon.pokemon_species.name}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Stack>
      {/* {console.log(pokedex.descriptions[0].description)} */}
      {/* <Typography>{pokedex.descriptions[0].description}</Typography> */}
    </>
  )
}