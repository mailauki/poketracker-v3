import Main from "@/components/Main"
import Profile from "@/app/user/[username]/Profile"
import DexCard from "@/app/user/[username]/DexCard"
import DexContainer from "@/app/user/[username]/DexContainer"
import { createClient } from "@/utils/supabase/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Metadata } from "next"
// import { createClient } from '@/utils/supabase/client'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Dex, Game } from "@/utils/types"
import DexForm from "@/app/user/[username]/DexForm"
import { getGames } from "@/app/api/actions"

export const metadata: Metadata = {
  title: 'Profile',
  icons: {
    icon: '/pokeball-dark.png'
  }
}
export default async function ProfilePage({ params: { username } }: { params: { username: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { session } } = await supabase.auth.getSession()
  
  // if (!session) {
  //   // this is a protected route - only users who are signed in can view this route
  //   redirect('/login')
  // }

  const { data: dexes } = await supabase
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
  `).match({ username: username })
  .returns<Dex[]>()

  // const { data } = await supabase.from('pokedexes').select()

  const games = await getGames()

  // const pokedexEntries = await getPokedexEntries(pokedex)

  return (
    <Main>
      {/* <h1>User {params?.slug}</h1> */}
      {/* <pre>{JSON.stringify(pokedexes, null, 2)}</pre> */}
      <Profile username={username} pokedexes={dexes} />
    
      {session && <DexForm games={games} />}
    </Main>
  )
}