'use client'

import { Box, Button, List, ListItemButton, ListItemText } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Wrapper() {
  const [generations, setGenerations] = useState([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/generation")
    .then((res) => res.json())
    .then((data) => setGenerations(data.results))
  }, [])

  console.log(generations)

  return (
    <Box>
      {/* {generations.map(gen => <Button key={gen.name}>{gen.name}</Button>)} */}
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
    </Box>
  )
}