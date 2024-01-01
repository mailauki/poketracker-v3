import { Box, Card, CardHeader, CardMedia, IconButton, Paper, Stack, Typography } from "@mui/material"
import { padZero } from "@/utils/helper"
import { useEffect, useState } from "react"
import { PokeProps, Sprites } from "@/utils/types"
import Image from "next/image"
import Loading from "@/app/loading"
import { More, MoreVert } from "@mui/icons-material"

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
    <Card sx={{ width: 150, height: 150, position: 'relative' }}>
      <IconButton
        aria-label="captured"
        color='inherit'
        sx={{
          color: 'GrayText',
          position: 'absolute',
          bottom: 2,
          right: 2,
          zIndex: 2
        }}
      >
        {/* <Image
          src="/pokeball.svg"
          width={32}
          height={32}
          alt="pokeball"
        /> */}
        <MoreVert />
      </IconButton>

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
          {sprites ? (
            <CardMedia
              component="img"
              sx={{
                width: 100,
                height: 100,
                mx: 'auto'
              }}
              image={sprites?.front_default}
              alt={pokemon.pokemon_species.name}
            />
          ) : (
            <Loading />
          )}
          {/* {sprites && (
            <Image
            src={sprites!.front_default}
            alt={pokemon.pokemon_species.name}
            width={100}
            height={100}
            // loader={<Loading />}
            loading='lazy'
            placeholder='empty'
            />
          )} */}
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

      {/* <CardHeader
        // disableTypography
        action={
          <IconButton
            aria-label="captured"
            sx={{
              filter: (theme) => theme.palette.mode == 'dark' ? 'invert(1)': ''
            }}
          >
            <Image
              src="/pokeball.svg"
              width={32}
              height={32}
              alt="pokeball"
            />
          </IconButton>
        }
        title={<Typography variant='overline'>{pokemon?.pokemon_species.name}</Typography>}
        subheader={<Typography color='text.secondary' variant='caption'>{padZero(pokemon?.entry_number)}</Typography>}
        // sx={{ zIndex: (theme) => theme.zIndex.mobileStepper }}
      /> */}
    </Card>
  )
}