'use client'

import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import Menu from "./menu"
import { useParams } from "next/navigation"

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
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap textTransform="uppercase">
            {params.slug}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
      >
        <Toolbar />
        <Menu />
      </Drawer>
    </>
  );
}