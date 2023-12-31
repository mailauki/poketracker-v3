'use client'

import { Box, Button, Divider, List, ListItemButton, ListItemText, Tab, Tabs, useTheme } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Game } from "@/utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login, Logout } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"
import NavTab from "./NavTab"

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

  const tabs = [
    {
      href: '/',
      label: 'home',
      icon: <CatchingPokemon />
    }, {
      href: '/login',
      label: 'login',
      icon: <Login />
    }, {
      href: '/profile',
      label: 'profile',
      icon: <Person />
    }, {
      href: '/account',
      label: 'account settings',
      icon: <Settings />
    }
  ]

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
        {tabs.map((tab) => (
          <NavTab
            key={tab.href}
            href={tab.href}
            label={tab.label}
            icon={tab.icon}
          />
        ))}
        <form action='/auth/signout'>
          <NavTab
            href='/signout'
            label='signout'
            icon={<Logout />}
          />
        </form>
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