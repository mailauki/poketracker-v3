'use client'

import { Box, Button, List, ListItemButton, ListItemText, Stack } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Wrapper() {
  const [generations, setGenerations] = useState([])
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/generation")
    .then((res) => res.json())
    .then((data) => setGenerations(data.results))

    fetch("https://pokeapi.co/api/v2/version-group?limit=27")
    .then((res) => res.json())
    .then((data) => setGames(data.results))
  }, [])

  console.log(generations)

  return (
    <Box>
      {/* {generations.map(gen => <Button key={gen.name}>{gen.name}</Button>)} */}
      <Stack direction='row'>
        <List>
          {generations.map((gen, index) => 
            <ListItemButton
              key={gen.name}
              compoment={Link}
              href={`/generation/${index+1}`}
            >
              <ListItemText primary={gen.name} />
            </ListItemButton>
          )}
        </List>
        <List>
          {games.map(game => 
            <ListItemButton
              key={game.name}
              component={Link}
              href={`/game/${game.name}`}
            >
              <ListItemText primary={game.name} />
            </ListItemButton>
          )}
        </List>
      </Stack>
    </Box>
  )
}