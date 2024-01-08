// const addPokemon = async () => {
  //   'use server'

  //   // const supabase = createServerActionClient<Database>({ cookies })
  //   const cookieStore = cookies()
  //   const supabase = createClient(cookieStore)
  //   const { data } = await supabase.from('pokemon').insert({ pokemon: pokemon.pokemon_species.url.split('/')[6] }).select()
  //   // revalidatePath('/')
  //   console.log({data})
  // }
  import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const number = String(formData.get('number'))
  const dex = String(formData.get('dex'))
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // console.log({pokemon}, {dex})

  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
  .from('profiles')
  .select('username')
  .eq('id', user?.id)
  .single()

  const { data: pokedex } = await supabase
  .from('pokedexes')
  .select(`
    id,
    captured
  `)
  .match({ user_id: user?.id })
  .ilike('title', dex.split("-").join(" "))
  .single()

  console.log({pokedex})
  console.log({ number, pokedex: pokedex?.id, user_id: user?.id })

  // const supabase = createServerActionClient<Database>({ cookies })
  const { data: pokemon } = await supabase
  .from('pokemon')
  .insert({ number, pokedex: pokedex?.id, user_id: user?.id })
  .select()
  .single()

  const { data } = await supabase.rpc('increment_pokedexes', { row_id: pokedex?.id })

  // revalidatePath('/')

  // return NextResponse.json(data)
  return redirect(`/user/${profile?.username}/${dex}`)
}