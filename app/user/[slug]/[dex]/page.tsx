import Main from "@/components/Main"
import Pokedexes from "@/components/pokemon/Pokedexes"
import { createClient } from "@/utils/supabase/server"
import { Toolbar } from "@mui/material"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DexPage({ params: { slug, dex } }: { params: { slug: string, dex: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }

  const { data: pokedex } = await supabase.from('pokedexes')
  .select(`
    id,
    title,
    game,
    type,
    shiny,
    user
  `)
  .match({ user: slug })
  .ilike('title', dex.split("-").join(" "))
  .single()

  return (
    <Main>
      {/* <h1>Dex Page</h1>
      <p>Dex Name: {dex}</p>
      <p>Username: {slug}</p>
      <pre>{JSON.stringify(pokedex, null, 2)}</pre> */}
      <Pokedexes game={pokedex!.game} />
    </Main>
  )
}