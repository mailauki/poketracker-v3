import Pokedexes from "@/components/Pokedexes"
import { Toolbar } from "@mui/material"

export default function GenPage({ params }: { params: { slug: string } }) {
  
  return (
    <>
      <Toolbar />
      {/* <h1>Game {params.slug}</h1> */}
      <Pokedexes slug={params.slug} />
    </>
  )
}