import { Box, Card, CardActionArea, CardActions, CardHeader, CardMedia, IconButton, Paper, Stack, Typography } from "@mui/material"
import { padZero } from "@/utils/helper"
import { useEffect, useState } from "react"
import { PokeProps, Sprites } from "@/utils/types"
import Image from "next/image"
import Loading from "@/app/loading"
import { More, MoreVert } from "@mui/icons-material"

export default function PokeCard({ pokemon }: PokeProps) {
  const [sprites, setSprites] = useState<Sprites | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [captured, setCaptured] = useState(false)
  console.log(pokemon)

  useEffect(() => {
    fetch(pokemon.pokemon_species.url)
    .then((res) => res.json())
    .then((data) => {
      setLoading(true)

      // console.log(data.evolution_chain.url)
      fetch(data.varieties[0].pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setSprites(data.sprites)

        setLoading(false)
      })
    })
  }, [pokemon.pokemon_species.url])

  return (
    <Card
      sx={{ width: 150, height: 150, position: 'relative' }}
      // elevation={captured ? 0 : 1}
      variant={captured ? "outlined" : "elevation"}
    >
      <CardActionArea
        sx={{ width: '100%', height: '100%' }}
        onClick={() => setCaptured(!captured)}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            {sprites && !loading ? (
              <CardMedia
                component="img"
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  filter: captured ? '' : 'grayscale(100%) brightness(0) invert(1) opacity(0.5)'
                }}
                image={sprites?.front_default}
                alt={pokemon.pokemon_species.name}
              />
            ) : (
              <Loading />
            )}
          </Box>
        </Box>

        <Stack
          justifyContent='space-between'
          alignItems='center'
          sx={{
            width: '100%',
            height: '100%',
            p: 1,
            zIndex: 1
          }}
        >
          <Typography variant='overline'>
            {pokemon?.pokemon_species.name}
          </Typography>
          <Typography color='text.secondary' variant='caption'>
            {padZero(pokemon?.entry_number)}
          </Typography>
        </Stack>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="more info"
          color='inherit'
          sx={{
            color: 'GrayText',
            position: 'absolute',
            bottom: 2,
            right: 2,
            zIndex: 3
          }}
          onClick={() => console.log('more info')}
        >
          <MoreVert />
        </IconButton>
      </CardActions>
    </Card>
  )
}