'use client'

import { Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, useTheme } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Game, LinkButtonProps } from "@/utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login, Logout } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"

export default function Nav() {
  const [games, setGames] = useState<Array<Game>>([])
  const pathname = usePathname()
  const theme = useTheme()
  const [value, setValue] = useState<string>(pathname)


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/version-group?limit=27")
    .then((res) => res.json())
    .then((data) => setGames(data.results))
  }, [])

  useEffect(() => {
    setValue(pathname)
  }, [pathname])

  const LinkButton = function(props: LinkButtonProps) {
    return (
      <ListItemButton
        selected={value == props.href}
        component={Link}
        href={props.href}
        sx={{
          textTransform: 'uppercase',
          borderRight: '4px solid',
          borderColor: value == props.href ? theme.palette.primary.main : 'transparent'
        }}
      >
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItemButton>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        overflowY: 'scroll',
        pb: 3
      }}
    >
      <List component='nav'>
        <LinkButton
          href='/'
          label='home'
          icon={<CatchingPokemon />}
        />
        <LinkButton
          label='login'
          href='/login'
          value='/login'
          icon={<Login />}
        />

        <Divider />

        <LinkButton
          label='profile'
          href='/profile'
          value='/profile'
          icon={<Person />}
        />
        <LinkButton
          label='account settings'
          href='/account'
          value='/account'
          icon={<Settings />}
        />
        <form action='/auth/signout'>
          <ListItemButton
            type='submit'
            component={Button}
            sx={{
              width: '100%',
              textTransform: 'uppercase',
              borderRight: '4px solid',
              borderColor: 'transparent'
            }}
          >
            <ListItemIcon>
              {<Logout />}
            </ListItemIcon>
            <ListItemText primary='sign out' />
          </ListItemButton>
        </form>

        <Divider />

        {games.map((game) => 
          <LinkButton
            key={game.name}
            href={`/game/${game.name}`}
            value={`/game/${game.name}`}
            label={`${adjustName(game.name)}`}
          />
        )}
      </List>
    </Box>
  )
}