import Loading from "@/app/loading"
import DexHeader from "@/app/user/[username]/[dex]/DexHeader"
import Main from "@/components/Main"
import DexCard from "@/app/user/[username]/DexCard"
import Pokedexes from "@/components/pokemon/Pokedexes"
import { createClient } from "@/utils/supabase/server"
import { Dex, DexProps } from "@/utils/types"
import { Container } from "@mui/material"
import { QueryData } from "@supabase/supabase-js"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Pokedex from "@/app/user/[username]/[dex]/Pokedex"
import PokedexContainer from "@/app/user/[username]/[dex]/PokedexContainer"
import { getPokedexTabs } from "@/app/api/actions"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: 'Dex',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default async function DexPage({ params: { username, dex } }: { params: { username: string, dex: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { session } } = await supabase.auth.getSession()

  const { data: pokedex } = await supabase
  .from('pokedexes')
  .select(`
    id,  
    title,
    game,
    type,
    shiny,
    username,
    captured,
    entries,
    hash,
    captured_pokemon (
      number
    )
  `)
  .match({ username: username })
  .eq('hash', dex)
  .returns<Dex[]>()
  // .limit(1)
  .single()


  if (!pokedex) return <Loading />

  // console.log(pokedex)

  const { data: game } = await supabase
  .from('games')
  .select()
  .eq('hash', pokedex.game)
  .single()

  const pokedexes = await getPokedexTabs(game)
  // const pokedexEntries = await getPokedexEntries(pokedex)
  const entriesTotal = pokedexes?.reduce((total, pokedex) => {
    const number = pokedex.entries
    return total + number
  }, 0)

  return (
    <Main>
        {/* <h1>Dex Page</h1>
        <p>Dex Name: {dex}</p>
        <p>Username: {slug}</p> */}
        {/* <pre>{JSON.stringify(pokedex, null, 2)}</pre> */}
        <DexHeader dex={pokedex} entries={entriesTotal} />
        {/* <Pokedexes
          game={pokedex.game}
          captured={pokedex.captured_pokemon}
          registered={pokedex.registered_pokemon} 
        /> */}
        {/* <Pokedex
          game={game}
          captured={pokedex.captured_pokemon}
          // registered={pokedex.registered_pokemon}
        /> */}
        <PokedexContainer
          pokedexes={pokedexes!}
          captured={pokedex.captured_pokemon}
        />
    </Main>
  )
}