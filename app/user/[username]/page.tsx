import Main from "@/components/Main"
import Profile from "@/components/Profile"
import DexCard from "@/components/dex/DexCard"
import DexContainer from "@/components/dex/DexContainer"
import { createClient } from "@/utils/supabase/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Metadata } from "next"
// import { createClient } from '@/utils/supabase/client'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Dex } from "@/utils/types"

export const metadata: Metadata = {
  title: 'Account',
  icons: {
    icon: '/pokeball-dark.png'
  }
}
export default async function ProfilePage({ params: { username } }: { params: { username: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }

  const { data: pokedexes } = await supabase.from('pokedexes').select(`
    id,
    title,
    game,
    type,
    shiny,
    username,
    pokemon (
      number
    )
  `).match({ username: username })
  // const { data } = await supabase.from('pokedexes').select()


  return (
    <Main>
      {/* <h1>User {params?.slug}</h1> */}
      {/* <pre>{JSON.stringify(pokedexes, null, 2)}</pre> */}
      <Profile username={username} pokedexes={pokedexes} />
    </Main>
  )
}