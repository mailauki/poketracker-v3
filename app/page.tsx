import { Typography } from "@mui/material"
import styles from "./page.module.css"
import { Metadata } from 'next'
// import Nav from "../components/Nav"
import Profile from "../components/Profile"
// import SignOut from "@/components/SignOutBtn"
// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'

export const metadata: Metadata = {
  // title: 'PokéTracker',
  title: {
    template: '%s | PokéTracker',
    default: 'PokéTracker',
  },
  description: '...',
  icons: {
    // icon: '/pokeball.svg'
    icon: '/pokeball-dark.png'
  }
}

export default function Home() {
  // const getUser = async () => {
  //   'use server'

  //   const cookieStore = cookies()
  //   const supabase = createClient(cookieStore)

  //   const { data: { user } } = await supabase.auth.getUser()
  //   return user
  // }

  return (
    <main className={styles.main}>
      <Typography variant="h1">PokéTracker</Typography>
      {/* <Nav /> */}
      <Profile />
      {/* {console.log()} */}
      {/* <SignOut /> */}
      <footer></footer>
    </main>
  )
}
