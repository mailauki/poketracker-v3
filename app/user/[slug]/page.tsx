import Main from "@/components/Main"
import Profile from "@/components/Profile"
import DexCard from "@/components/dex/DexCard"
import DexContainer from "@/components/dex/DexContainer"
import { createClient } from "@/utils/supabase/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// import { createClient } from '@/utils/supabase/client'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ProfilePage({ params: { slug } }: { params: { slug: string } }) {
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
    user,
    user_id
  `).match({ user: slug })
  // const { data } = await supabase.from('pokedexes').select()


  return (
    <Main>
      {/* <h1>User {params?.slug}</h1> */}
      {/* <pre>{JSON.stringify(pokedexes, null, 2)}</pre> */}
      <Profile username={slug} pokedexes={pokedexes} />
    </Main>
  )
}