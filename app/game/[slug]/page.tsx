import Pokedex from "@/app/components/pokedex"
import Pokedexes from "@/app/components/pokedexes"

export default function GenPage({ params }: { params: { slug: string } }) {
  
  return (
    <>
      <h1>Game {params.slug}</h1>
      <Pokedexes slug={params.slug} />
    </>
  )
}