'use client'

import { useEffect, useState } from "react"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Game } from "@/utils/types"
import { adjustName, hyphenate } from "@/utils/helper"
import { createClient } from "@/utils/supabase/client"
import { usePathname } from "next/navigation"
import { addDex, getGames } from "@/app/api/actions"
import GameSelect from "./GameSelect"
import CreateDexBtn from "./CreateDexBtn"

export default function DexForm({ games }: { games: Game[] | null }) {
  // const [games, setGames] = useState<Array<Game>>([])
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<string | null>(null)
  const [game, setGame] = useState<string | null>('home')
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

  return (
    <>
      <Button
        variant='contained'
        size="large"
        onClick={handleClickOpen}
        sx={{ mt: 3 }}
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
              helperText={`${pathname}/${hyphenate(title! || "Living Dex")}`}
              placeholder="Living Dex"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <GameSelect games={games} />
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

            <FormControl>
              <FormLabel id="dex-type-label">Dex Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="dex-type-label"
                name="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <FormControlLabel value="National" control={<Radio />} label="National" />
                <FormControlLabel value="Regional" control={<Radio />} label="Regional" />
                <FormControlLabel value="Collective" control={<Radio />} label="Collective" />
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
            <CreateDexBtn />
          </Stack>
        </DialogContent>

        <DialogActions>
          {/* <Button
            variant='contained'
            fullWidth
            autoFocus
            onClick={() => addDex({ title, game, type, shiny, entries, number: pokedexId })}
            size='large'
            sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
          >
            Create
          </Button> */}
          {/* <CreateDexBtn /> */}
        </DialogActions>
      </Dialog>
    </>
  )
}