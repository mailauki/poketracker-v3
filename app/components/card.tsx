import { Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material"
import padZero from "../utils/padZero"
import { useEffect, useState } from "react"
import Image from "next/image"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useParams } from "next/navigation"

export default function PokeCard({ pokemon, version }) {
  const params = useParams()
  const [sprites, setSprites] = useState([])
  // console.log(pokemon)
  useEffect(() => {
    fetch(pokemon.pokemon_species.url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.evolution_chain.url)
      // console.log(data.varieties[0].pokemon.url)
      fetch(data.varieties[0].pokemon.url)
      .then((res) => res.json())
      .then((data) => setSprites(data.sprites))
    })
  }, [pokemon.pokemon_species.url])

  // console.log(sprites.versions['generation-iii'][version.name].front_default)
  // console.log(params.slug)
  // console.log(version)
  // console.log(sprites)

  return (
    <Card sx={{ width: 220 }}>
      <CardHeader
        action={
          <IconButton aria-label="captured">
            <MoreVertIcon />
          </IconButton>
        }
        title={pokemon.pokemon_species.name}
        subheader={padZero(pokemon.entry_number)}
      />
      <CardMedia
        component="img"
        sx={{ width: 100, mx: 'auto' }}
        image={sprites.front_default}
        alt={pokemon.pokemon_species.name}
      />
    </Card>
  )
}