'use client'

import { useCallback, useEffect, useState } from "react"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Game } from "@/utils/types"
import { adjustName, hyphenate } from "@/utils/helper"
import { createClient } from "@/utils/supabase/client"
import { useParams, usePathname } from "next/navigation"
import { addDex, getGames, getPokedexTabs } from "@/app/api/actions"
import GameSelect from "./GameSelect"
import CreateDexBtn from "../../../components/dex/CreateDexBtn"

export default function DexForm({ games }: { games: Game[] | null }) {
  // const [games, setGames] = useState<Array<Game>>([])
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<string | null>(null)
  const [game, setGame] = useState<string>('')
  const [type, setType] = useState<string | null>(null)
  const [shiny, setShiny] = useState<boolean>(false)
  const [entries, setEntries] = useState<number>(0)
  const [pokedexId, setPokedexId] = useState<string>('1')
  const pathname = usePathname()

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/version-group?limit=27")
  //   .then((res) => res.json())
  //   .then((data) => setGames(data.results))
  // }, [])

  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/version-group/${game}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setPokedexId(data.pokedexes.map((dex: any) => dex.url)[0].split("/")[6])

  //     return Promise.all(data.pokedexes.map((dex: any) => {
  //       return fetch(dex.url)
  //       .then((res) => res.json())
  //       .then(dex_data => {
  //         return dex_data.pokemon_entries.length
  //       })
  //     }))
  //   })
  //   .then((data) => {
  //     setEntries(data.reduce((total, item) => total + item)
  //   )})
  // }, [game])

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   handleClose()
  // }

  // async function addDex({
  //   title,
  //   game,
  //   type,
  //   shiny,
  //   entries,
  //   number
  // }: {
  //   title: string | null
  //   game: string | null
  //   type: string | null
  //   shiny: boolean,
  //   entries: number,
  //   number: string | null
  // }) {
  //   try {
  //     setLoading(true)

  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser()
      
  //     const { data: profile } = await supabase
  //     .from('profiles')
  //     .select('username')
  //     .eq('id', user?.id)
  //     .single()

  //     const { error } = await supabase.from('pokedexes').insert({
  //       title,
  //       game,
  //       type,
  //       shiny,
  //       username: profile?.username,
  //       user_id: user?.id,
  //       entries,
  //       number
  //     })
  //     if (error) throw error
  //     alert('Dex added!')
  //   } catch (error) {
  //     alert('Error updating the data!')
  //   } finally {
  //     setLoading(false)
  //     handleClose()
  //   }
  // }

  // const entriesTotal = pokedexes.reduce((total, pokedex) => {
  //   const number = pokedex.entries
  //   return total + number
  // }, 0)
  const getDexes = useCallback(async () => {
    const pokedexes = await getPokedexTabs(games?.find(g => g.hash == game)!)
    const entriesTotal = pokedexes?.reduce((total, pokedex) => {
      const number = pokedex.entries
      return total + number
    }, 0)
    setEntries(entriesTotal!)
    setPokedexId(games?.find(g => g.hash == game)?.pokedex!)
  }, [game, games])

  useEffect(() => {
    getDexes()
  }, [entries, pokedexId, getDexes])

  const handleChangeGame = (event: SelectChangeEvent) => {
    setGame(event.target.value as string)
  }

  return (
    <>
      <Button
        variant='contained'
        size="large"
        onClick={handleClickOpen}
        sx={{ mt: 4 }}
      >
        Create New Dex
      </Button>

      <Dialog
        maxWidth='sm'
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2, minWidth: 300 }} id="dialog-title">Create New Dex</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent dividers>
          <Stack
            direction='column'
            spacing={2}
            component='form'
            // action='/api/dexes'
            // method="post"
            // action={addDex}
            // action={() => addDex({ title, game, type, shiny, entries, number: pokedexId })}
          >
            <TextField
              label='Title'
              name='title'
              required
              helperText={`${pathname}/${hyphenate(title?.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") || "Living Dex")}`}
              placeholder="Living Dex"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <GameSelect
              games={games}
              game={game}
              handleChangeGame={handleChangeGame}
            />
            {/* <FormControl fullWidth>
              <InputLabel id="game-select-label">Game</InputLabel>
              <Select
                labelId="game-select-label"
                id="game-select"
                label='Game'
                name='game'
                // defaultValue='home'
                value={game}
                onChange={(event) => setGame(event.target.value)}
                sx={{ textTransform: 'uppercase' }}
              >
                <MenuItem
                  value='home'
                  sx={{ textTransform: 'uppercase' }}
                >
                  Home
                </MenuItem>
                {games.map((game) => (
                  <MenuItem
                    key={game.name}
                    value={`${game.name}`}
                    sx={{ textTransform: 'uppercase' }}
                  >
                    {`${adjustName(game.name)}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl required>
              <FormLabel id="dex-type-label">Dex Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="dex-type-label"
                name="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {game == 'home' ? (
                  <FormControlLabel value="National" control={<Radio />} label="National" />
                ) : (
                  games?.find(g => g.hash == game)?.DLC ? (
                    <FormControlLabel value="Collective" control={<Radio />} label="Collective" />
                  ) : (
                    <FormControlLabel value="Regional" control={<Radio />} label="Regional" />
                  )
                )}
              </RadioGroup>
            </FormControl>

            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">Customizations</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="shiny"
                      checked={shiny}
                      value={shiny}
                      onChange={(event) => setShiny(event.target.checked)}
                    />
                  }
                  label="Shiny"
                />
              </FormGroup>
            </FormControl>

            {/* <Button
              variant='contained'
              type="submit"
              fullWidth
              autoFocus
              // onClick={handleClose}
              sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
            >
              Create
            </Button> */}
            {/* <CreateDexBtn /> */}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            variant='contained'
            fullWidth
            autoFocus
            onClick={() => addDex({ title, game, type, shiny, entries, number: pokedexId, hash: `${hyphenate(title?.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") || "Living Dex")}` })}
            size='large'
            sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}