// 'use client'

// import { ArrowBackIosNew, Menu as MenuIcon } from "@mui/icons-material"
// import { AppBar, Box, Button, Drawer, IconButton, Link as Anchor, Toolbar } from "@mui/material"
// import { useState } from "react"
// import { useParams } from "next/navigation"
// import Nav from "./Nav"
// import Link from "next/link"
// import { adjustName } from "@/utils/helper"
import { Session } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/types"
import ProfileBtn from "./auth/ProfileBtn"
import AuthButton from "./auth/AuthButton"
import Nav from "./Nav"
import AccountMenu from "./AccountMenu"

// const drawerWidth = 350

export default async function Header({ session }: { session: Session | null }) {
  // const params = useParams()
  // const [open, setOpen] = useState(false)
  const supabase = createClientComponentClient<Database>()
  
  // const handleDrawerOpen = () => {
  //   setOpen(true)
  // }

  // const handleDrawerClose = () => {
  //   setOpen(false)
  // }

  // const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', session?.user?.id)
    .single()

  // console.log(profile)

  return (
    <>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <p>{profile?.username}</p> */}
      {/* <ProfileBtn username={profile?.username} /> */}
      {/* <AuthButton /> */}
      <AccountMenu username={profile?.username} avatar_url={profile?.avatar_url} />
    </>
    // <>
    //   <AppBar
    //     position='fixed'
    //     color='secondary'
    //     sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   >
    //     <Toolbar>
    //       {!open ? (
    //         <IconButton
    //           color='inherit'
    //           aria-label='open drawer'
    //           edge='start'
    //           onClick={handleDrawerOpen}
    //           sx={{ mr: 2 }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //       ) : (
    //         <IconButton
    //           color='inherit'
    //           aria-label='open drawer'
    //           edge='start'
    //           onClick={handleDrawerClose}
    //           sx={{ mr: 2 }}
    //         >
    //           <ArrowBackIosNew />
    //         </IconButton>
    //       )}
    //       <Anchor
    //         variant='h6'
    //         noWrap
    //         textTransform='uppercase'
    //         color='inherit'
    //         underline='none'
    //         href='/'
    //         sx={{ flexGrow: 1 }}
    //       >
    //         {params.slug ? adjustName(String(params.slug)) : 'PokéTracker'}
    //       </Anchor>

    //       <Button
    //         color='inherit'
    //         aria-label='login'
    //         component={Link}
    //         href='/login'
    //       >
    //         Login
    //       </Button>
    //     </Toolbar>
    //   </AppBar>

    //   <Drawer
    //     open={open}
    //     onClose={handleDrawerClose}
    //     sx={{
    //       '& .MuiDrawer-paper': {
    //         boxSizing: 'border-box', width: drawerWidth
    //       },
    //     }}
    //   >
    //     <Toolbar />
    //     <Box
    //       onClick={handleDrawerClose}
    //       onKeyDown={handleDrawerClose}
    //       sx={{
    //         flexGrow: 1,
    //         bgcolor: 'background.paper',
    //         display: 'flex',
    //         height: '100%',
    //         overflow: 'hidden'
    //       }}
    //     >
    //       <Nav />
    //     </Box>
    //   </Drawer>
    // </>
  );
}