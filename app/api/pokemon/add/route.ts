// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'

// export async function POST(request: Request) {
//   const requestUrl = new URL(request.url)
//   const formData = await request.formData()
//   const number = String(formData.get('number'))
//   const dex = String(formData.get('dex'))
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const { data: { user } } = await supabase.auth.getUser()
  
//   const { data: profile } = await supabase
//   .from('profiles')
//   .select('username')
//   .eq('id', user?.id)
//   .single()

//   const { data: pokedex } = await supabase
//   .from('pokedexes')
//   .select(`
//     id,
//     captured
//   `)
//   .match({ user_id: user?.id })
//   .ilike('title', dex.split("-").join(" "))
//   .single()

//   console.log({pokedex})
//   console.log({ number, pokedex: pokedex?.id, user_id: user?.id })

//   const { data: pokemon } = await supabase
//   .from('captured_pokemon')
//   .insert({ number, pokedex: pokedex?.id, user_id: user?.id })
//   .select()
//   .single()

//   const { data } = await supabase.rpc('increment_pokedexes', { row_id: pokedex?.id })

//   return redirect(`/user/${profile?.username}/${dex}`)
// }