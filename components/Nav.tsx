'use client'

import { Divider, List, ListItemButton, ListItemText } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Game } from "../utils/types"

export default function Nav() {
  const [games, setGames] = useState<Array<Game>>([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/version-group?limit=27")
    .then((res) => res.json())
    .then((data) => setGames(data.results))
  }, [])

  return (
    <List>
      <ListItemButton
        component={Link}
        href="/"
      >
        <ListItemText primary="home" />
      </ListItemButton>
      <Divider />
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
  )
}