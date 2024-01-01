import { Metadata } from "next"
import styles from "../../page.module.css"
import Pokedexes from "@/components/pokemon/Pokedexes"
import { Toolbar } from "@mui/material"
import Main from "@/components/Main"

export const metadata: Metadata = {
  title: 'Game',
  // title: `Game ${params.slug}`,
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default function GamePage({ params }: { params: { slug: string } }) {
  
  return (
    <Main>
      {/* <Toolbar sx={{ mb: 2 }} /> */}
      {/* <h1>Game {params.slug}</h1> */}
      <Pokedexes slug={params.slug} />
    </Main>
  )
}