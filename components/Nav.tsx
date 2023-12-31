'use client'

import { Button, Divider, Tab, Tabs, useTheme } from "@mui/material"
import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import { Game } from "@/utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login, Logout } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"
import NavTab from "./NavTab"

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

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
      // onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      //   // Routing libraries handle this, you can remove the onClick handle when using them.
      //   if (samePageLinkNavigation(event)) {
      //     event.preventDefault();
      //   }
      // }}
      {...props}
      // href={props.href == '/signout' ? '' : props.href}
      type={props.href == '/signout' ? 'submit' : ''}
      // value={props.href}
      // label={props.label}
      // icon={props.icon}
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
        value={value}
        aria-label="nav tabs"
        role="navigation"
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