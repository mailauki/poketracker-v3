import Loading from "@/app/loading"
import DexHeader from "@/components/DexHeader"
import Main from "@/components/Main"
import DexCard from "@/components/dex/DexCard"
import Pokedexes from "@/components/pokemon/Pokedexes"
import { createClient } from "@/utils/supabase/server"
import { Dex, DexProps } from "@/utils/types"
import { Container } from "@mui/material"
import { QueryData } from "@supabase/supabase-js"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: 'Dex',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default async function DexPage({ params: { username, dex } }: { params: { username: string, dex: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }

  const { data: pokedex, error } = await supabase.from('pokedexes')
  .select(`
    id,  
    title,
    game,
    type,
    shiny,
    username,
    pokemon (
      number
    )
  `)
  .match({ username: username })
  .ilike('title', dex.split("-").join(" "))
  // .returns<Dex>()
  .limit(1)
  .single()


  if (!pokedex) return <Loading />

  console.log(pokedex)

  return (
    <Main>
        {/* <h1>Dex Page</h1>
        <p>Dex Name: {dex}</p>
        <p>Username: {slug}</p> */}
        {/* <pre>{JSON.stringify(pokedex, null, 2)}</pre> */}
        <DexHeader dex={pokedex} />
      <Pokedexes game={pokedex.game} captured={pokedex.pokemon} />
    </Main>
  )
}