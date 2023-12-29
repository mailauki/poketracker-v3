'use client'

import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "next/navigation"
import Nav from "./Nav"
import Link from "next/link"
import SignOut from "./SignOutBtn"

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
      <AppBar>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
          {/* <SignOut /> */}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
      >
        <Toolbar />
        <Nav />
      </Drawer>
    </>
  );
}