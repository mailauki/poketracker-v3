'use client'

import { ArrowBackIosNew, ChevronLeft, Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Button, Drawer, IconButton, Link as Anchor, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "next/navigation"
import Nav from "./Nav"
import Link from "next/link"
import SignOut from "./SignOutBtn"
import { Session } from '@supabase/auth-helpers-nextjs'
import AuthButton from "./AuthButton"
import Login from "./LoginBtn"
import { adjustName } from "@/utils/helper"

const drawerWidth = 350

export default function Header() {
  const params = useParams()
  const [open, setOpen] = useState(false)
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AppBar
        position='fixed'
        color='secondary'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {!open ? (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerClose}
              sx={{ mr: 2 }}
            >
              <ArrowBackIosNew />
            </IconButton>
          )}
          <Anchor
            variant='h6'
            noWrap
            textTransform='uppercase'
            color='inherit'
            underline='none'
            href='/'
            sx={{ flexGrow: 1 }}
          >
            {params.slug ? adjustName(String(params.slug)) : 'PokéTracker'}
          </Anchor>

          <Button
            color='inherit'
            aria-label='login'
            component={Link}
            href='/login'
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <Box
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Nav />
        </Box>
      </Drawer>
    </>
  );
}