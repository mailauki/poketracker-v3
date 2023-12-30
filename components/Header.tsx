'use client'

import { ArrowBackIosNew, ChevronLeft, Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "next/navigation"
import Nav from "./Nav"
import Link from "next/link"
import SignOut from "./SignOutBtn"
import { Session } from '@supabase/auth-helpers-nextjs'

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
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Typography
            variant='h6'
            noWrap
            textTransform='uppercase'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            {params.slug || "PokéTracker"}
          </Typography>

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
      >
        <Toolbar />
        <Box
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
          sx={{ overflow: 'auto' }}
        >
          <Nav />
        </Box>
      </Drawer>
    </>
  );
}