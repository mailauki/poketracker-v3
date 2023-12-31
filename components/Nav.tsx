'use client'

import { Box, Divider, List, ListItemButton, ListItemText, Tab, Tabs, useTheme } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Game } from "../utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"

export default function Nav() {
  const [games, setGames] = useState<Array<Game>>([])
  const pathname = usePathname()
  const [tab, setTab] = useState<string>(pathname)
  const theme = useTheme()

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/version-group?limit=27")
    .then((res) => res.json())
    .then((data) => setGames(data.results))
  }, [])

  useEffect(() => {
    setTab(pathname)
  }, [pathname])

  return (
    <>
      <Tabs
        value={tab}
        orientation='vertical'
        variant='scrollable'
        textColor='secondary'
        indicatorColor='secondary'
        // sx={{ mt: 0.5, mb: 4 }}
        sx={{ width: '100%' }}
      >
        <Tab
          component={Link}
          href='/'
          value='/'
          label='home'
          icon={<CatchingPokemon />}
          iconPosition='start'
          sx={{
            minHeight: '60px',
            justifyContent: 'flex-start',
            '&:hover': { bgcolor: theme.palette.action.hover }
          }}
        />
        <Tab
          component={Link}
          href='/login'
          value='/login'
          label='login'
          icon={<Login />}
          iconPosition='start'
          sx={{
            display: 'none',
            minHeight: '60px',
            justifyContent: 'flex-start',
            '&:hover': { bgcolor: theme.palette.action.hover }
          }}
        />
        <Divider />
        <Tab
          component={Link}
          href='/profile'
          value='/profile'
          label='profile'
          icon={<Person />}
          iconPosition='start'
          sx={{
            minHeight: '60px',
            justifyContent: 'flex-start',
            '&:hover': { bgcolor: theme.palette.action.hover }
          }}
          disabled
        />
        <Tab
          component={Link}
          href='/account'
          value='/account'
          label='account'
          icon={<Settings />}
          iconPosition='start'
          sx={{
            minHeight: '60px',
            justifyContent: 'flex-start',
            '&:hover': { bgcolor: theme.palette.action.hover }
          }}
        />
        <Divider />
        {games.map((game) => 
          <Tab
            key={game.name}
            component={Link}
            href={`/game/${game.name}`}
            value={`/game/${game.name}`}
            label={`${adjustName(game.name)}`}
            sx={{ alignItems: 'flex-start', '&:hover': { bgcolor: theme.palette.action.hover } }}
          />
        )}
      </Tabs>
      {/* <List sx={{ mb: 4 }}>
        <ListItemButton
          component={Link}
          href="/"
        >
          <ListItemText primary="home" />
        </ListItemButton>
        <Divider />
        {games.map(game => 
          <ListItemButton
            key={game.name}
            component={Link}
            href={`/game/${game.name}`}
          >
            <ListItemText primary={game.name} />
          </ListItemButton>
        )}
      </List> */}
    </>
  )
}