import { Metadata } from "next"
import Pokedexes from "@/components/Pokedexes"
import { Toolbar } from "@mui/material"

export const metadata: Metadata = {
  title: 'Game',
  // title: `Game ${params.slug}`,
}

export default function GamePage({ params }: { params: { slug: string } }) {
  
  return (
    <>
      <Toolbar />
      {/* <h1>Game {params.slug}</h1> */}
      <Pokedexes slug={params.slug} />
    </>
  )
}