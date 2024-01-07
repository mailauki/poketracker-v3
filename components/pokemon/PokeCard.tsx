import { Box, Card, CardActionArea, CardActions, CardHeader, CardMedia, IconButton, Paper, Stack, Typography } from "@mui/material"
import { padZero } from "@/utils/helper"
import { useEffect, useState } from "react"
import { Database, PokeProps, Sprites } from "@/utils/types"
import Image from "next/image"
import Loading from "@/app/loading"
import { MoreVert } from "@mui/icons-material"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"

export default function PokeCard({ pokemon, captured }: PokeProps) {
  const [sprites, setSprites] = useState<Sprites | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [isCaptured, setIsCaptured] = useState(captured!.find((mon: any) => mon.number === pokemon.pokemon_species.url.split('/')[6]) || false)
  const [number, setNumber] = useState(null)
  const { dex } = useParams()

  // console.log(pokemon.pokemon_species.url.split('/')[6])
  // console.log(captured)

  function handleCapture() {
    setIsCaptured(!isCaptured)
    console.log(pokemon.pokemon_species.url.split('/')[6])
  }

  useEffect(() => {
    // setIsCaptured(captured!.find((mon: any) => mon.number === pokemon.pokemon_species.url.split('/')[6]) ? true : false)
    // console.log(captured!.find((mon: any) => mon.number === pokemon.pokemon_species.url.split('/')[6]))
    // console.log(pokemon)

    fetch(pokemon.pokemon_species.url)
    .then((res) => res.json())
    .then((data) => {
      setLoading(true)

      // console.log(data.id)
      setNumber(data.id)
      setIsCaptured(captured!.find((mon: any) => mon.number === `${data.id}`) ? true : false)
      // console.log(data.evolution_chain.url)
      fetch(data.varieties[0].pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setSprites(data.sprites)

        setLoading(false)
      })
    })
  }, [captured, pokemon, pokemon.pokemon_species.url])

  // const addPokemon = async () => {
  //   'use server'

  //   // const supabase = createServerActionClient<Database>({ cookies })
  //   const cookieStore = cookies()
  //   const supabase = createClient(cookieStore)
  //   const { data } = await supabase.from('pokemon').insert({ pokemon: pokemon.pokemon_species.url.split('/')[6] }).select()
  //   // revalidatePath('/')
  //   console.log({data})
  // }

  return (
    <Card
      sx={{ width: 150, height: 150, position: 'relative', borderColor: 'secondary.dark' }}
      // elevation={isCaptured ? 0 : 1}
      variant={isCaptured ? "outlined" : "elevation"}
      component="form"
      action={isCaptured ? "/api/pokemon/remove" : "/api/pokemon/add"}
      method="post"
    >
      <input
        name="number"
        defaultValue={number!}
        // style={{ visibility: 'hidden' }}
        hidden
      />
      <input
        name="dex"
        defaultValue={dex}
        // style={{ visibility: 'hidden' }}
        hidden
      />
      <CardActionArea
        sx={{ width: '100%', height: '100%' }}
        // onClick={handleCapture}
        // onClick={addPokemon}
        type="submit"
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
                  filter: isCaptured ? '' : 'grayscale(100%) brightness(0) invert(1) opacity(0.5)'
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