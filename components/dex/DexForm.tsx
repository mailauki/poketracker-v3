'use client'

import { useEffect, useState } from "react"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Game } from "@/utils/types"
import { adjustName } from "@/utils/helper"

export default function DexForm() {
  const [games, setGames] = useState<Array<Game>>([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/version-group?limit=27")
    .then((res) => res.json())
    .then((data) => setGames(data.results))
  }, [])

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant='contained'
        onClick={handleClickOpen}
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
          <Stack direction='column' spacing={2}>
            <TextField
              label='Title'
              required
              helperText={`/username/hyphenated-title`}
            />

            <FormControl fullWidth>
              <InputLabel id="game-select-label">Game</InputLabel>
              <Select
                labelId="game-select-label"
                id="game-select"
                label='Game'
                defaultValue='home'
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
                    value={`/game/${game.name}`}
                    sx={{ textTransform: 'uppercase' }}
                  >
                    {`${adjustName(game.name)}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel id="dex-type-label">Dex Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="dex-type-label"
                name="dex-type"
              >
                <FormControlLabel value="national" control={<Radio />} label="Full National" />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Customizations</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox name="shiny" />
                  }
                  label="Shiny"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="gigantamax" />
                  }
                  label="Gigantamax Forms"
                />
              </FormGroup>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            variant='contained'
            fullWidth
            autoFocus
            onClick={handleClose}
            sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}