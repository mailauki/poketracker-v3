import { Avatar, Card, CardHeader, CardMedia, IconButton, SvgIcon } from "@mui/material"
import padZero from "../utils/padZero"
import { useEffect, useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { PokeProps, Sprites } from "../utils/pokeTypes"
import Image from "next/image"

export default function PokeCard({ pokemon }: PokeProps) {
  const [sprites, setSprites] = useState<Sprites | undefined>(undefined)

  useEffect(() => {
    fetch(pokemon.pokemon_species.url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.evolution_chain.url)
      fetch(data.varieties[0].pokemon.url)
      .then((res) => res.json())
      .then((data) => setSprites(data.sprites))
    })
  }, [pokemon.pokemon_species.url])

  return (
    <Card sx={{ width: 220 }}>
      <CardHeader
        action={
          <IconButton aria-label="captured">
            {/* <MoreVertIcon /> */}
            {/* <Avatar
              src="/pokeball.svg"
              sx={{ width: 32, height: 32 }}
            /> */}
            <Image
              src="/pokeball.svg"
              width={32}
              height={32}
              alt="pokeball"
            />
          </IconButton>
        }
        title={pokemon.pokemon_species.name}
        subheader={padZero(pokemon.entry_number)}
      />
      <CardMedia
        component="img"
        sx={{ width: 100, mx: 'auto' }}
        image={sprites?.front_default}
        alt={pokemon.pokemon_species.name}
      />
    </Card>
  )
}