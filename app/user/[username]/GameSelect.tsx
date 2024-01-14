'use client'

import { adjustName, hyphenate } from "@/utils/helper"
import { Game } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
}

export default function GameSelect({
  games, game, handleChangeGame
}: {
  games: Game[] | null,
  game: string,
  handleChangeGame: any
}) {
  // const [game, setGame] = useState('')

  // const handleChangeGame = (event: SelectChangeEvent) => {
  //   setGame(event.target.value as string)
  // }

  return (
    <FormControl fullWidth required>
      <InputLabel id="game-select-label">Game</InputLabel>
      <Select
        labelId="game-select-label"
        id="game-select"
        name="game"
        value={game}
        label="Game"
        onChange={handleChangeGame}
        MenuProps={MenuProps}
      >
        {games!.map((game: Game) => 
          <MenuItem
            key={game.id}
            value={game.hash}
          >
            {game.name}
          </MenuItem>
        )}
      </Select>
    </FormControl>
)
}