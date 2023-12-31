import { Typography } from "@mui/material"
import styles from "./page.module.css"
import { Metadata } from 'next'
import AuthButton from "@/components/AuthButton"

export const metadata: Metadata = {
  title: {
    template: '%s | PokéTracker',
    default: 'PokéTracker',
  },
  icons: {
    // icon: '/pokeball.svg'
    icon: '/pokeball-dark.png'
  }
}

export default function Home() {

  return (
    <main className={styles.main}>
      <Typography variant="h1">PokéTracker</Typography>

      {/* <Profile /> */}
      <AuthButton />
      {/* {console.log()} */}
      <footer></footer>
    </main>
  )
}
