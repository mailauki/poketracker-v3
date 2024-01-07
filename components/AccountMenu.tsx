'use client'

import { AppBar, Avatar, Box, Button, Divider, IconButton, Link as Anchor, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tab, Tabs, Toolbar, Tooltip, Typography, useTheme, Container, Skeleton } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Database, Game, LinkButtonProps } from "@/utils/types"
import { usePathname } from "next/navigation"
import { Person, Settings, CatchingPokemon, Login, Logout, MoreVert } from "@mui/icons-material"
import { adjustName } from "@/utils/helper"
import LoginBtn from "./auth/LoginBtn"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Loading from "@/app/loading"
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function AccountMenu({ username, avatar_url }: { username: string, avatar_url: string }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>()

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (avatar_url) downloadImage(avatar_url)
  }, [avatar_url, supabase])

  return (
    <>
      <AppBar
        position='fixed'
        color='secondary'
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} 
        // enableColorOnDark
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Anchor
              variant='h6'
              noWrap
              textTransform='uppercase'
              color='inherit'
              underline='none'
              href='/'
            >
              PokéTracker
            </Anchor>
          </Box>

          {username ? (
            <Box>
              <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {!avatarUrl ? (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={username} src={avatarUrl} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{
                  mt: '45px',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  }
                }}
              >
                <MenuItem
                  component={Link}
                  href={`/user/${username}`}
                  onClick={handleCloseUserMenu}
                >
                  {/* <Avatar /> Profile */}
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                {/* <Divider /> */}
                <MenuItem
                  component={Link}
                  href="/account"
                  onClick={handleCloseUserMenu}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Account Settings
                </MenuItem>
                <Divider />
                <form
                  action='/auth/signout'
                  method='post'
                >
                  <MenuItem
                    component="button"
                    type="submit"
                    sx={{ width: '100%' }}
                    onClick={handleCloseUserMenu}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Signout
                  </MenuItem>
                </form>
              </Menu>
            </Box>
          ) : (
            <Button
              color='inherit'
              aria-label='login'
              component={Link}
              href='/login'
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}