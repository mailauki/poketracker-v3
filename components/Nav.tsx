'use client'

import { Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, useTheme } from "@mui/material"
import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import { Game } from "@/utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login, Logout } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"

interface LinkTabProps {
  label?: string;
  href: string;
  selected?: boolean;
  value?: string,
  icon?: ReactElement
}

const LinkTab = function(props: LinkTabProps) {
  const theme = useTheme()

  return (
    <Tab
      component={props.href == '/signout' ? Button : Link}
      {...props}
      type={props.href == '/signout' ? 'submit' : ''}
      iconPosition='start'
      sx={{
        width: '100%',
        display: props.label == 'login' ? 'none' : '',
        minHeight: '60px',
        justifyContent: 'flex-start',
        '&:hover': { bgcolor: theme.palette.action.hover }
      }}
    />
  )
}

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

  const LinkButton = function(props: LinkTabProps) {
    return (
      <ListItemButton
        selected={value == props.href}
        component={props.href == '/signout' ? ListItemButton : Link}
        href={props.href}
        type={props.href == '/signout' ? 'submit' : ''}
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
    <>
      {/* <Tabs
        value={value}
        // aria-label='nav tabs'
        // role='navigation'
        orientation='vertical'
        variant='scrollable'
        sx={{ width: '100%' }}
      >
        <LinkTab
          label='home'
          href='/'
          value='/'
          icon={<CatchingPokemon />}
        />
        <LinkTab
          label='login'
          href='/login'
          value='/login'
          icon={<Login />}
        />

        <Divider />

        <LinkTab
          label='profile'
          href='/profile'
          value='/profile'
          icon={<Person />}
        />
        <LinkTab
          label='account settings'
          href='/account'
          value='/account'
          icon={<Settings />}
        />
        <form action='/auth/signout'>
          <LinkTab
            href='/signout'
            label='signout'
            value='/signout'
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
      </Tabs> */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'scroll', pb: 3 }}>
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
            <LinkButton
              href='/signout'
              label='signout'
              value='/signout'
              icon={<Logout />}
            />
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
    </>
  )
}