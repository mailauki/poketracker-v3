'use server'

import { createClient } from "@/utils/supabase/server"
import { Game } from "@/utils/types"
import { cookies } from "next/headers"

// export async function updateUser(userId, formData) {
// }

export async function getGames() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: games } = await supabase
  .from('games')
  .select('*')
  .returns<Game[] | null>()

  return games
}

export async function getPokedexTabs(game: Game) {
  if(game) {
    const id = Number(game.pokedex)

    const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokedex/${id+1}`)
    if (!res2.ok) {
      throw new Error('Failed to fetch data')
    }
    const data2 = await res2.json()

    const res3 = await fetch(`https://pokeapi.co/api/v2/pokedex/${id+2}`)
    if (!res3.ok) {
      throw new Error('Failed to fetch data')
    }
    const data3 = await res3.json()

    if (game.DLC) {
      return [
        {id: id, name: data.name, entries: data.pokemon_entries.length},
        {id: id+1, name: data2.name, entries: data2.pokemon_entries.length},
        {id: id+2, name: data3.name, entries: data3.pokemon_entries.length}
      ]
    } else {
      return [{id: id, name: data.name, entries: data.pokemon_entries.length}]
    }
  }
}

export async function getPokedexEntries(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
  // const data = await res.json()

  // return data.pokemon_entries
}

// export async function addDex(formData: FormData) {
//   const title = formData.get('title')
//   const game = formData.get('game')
//   const type = formData.get('type')
//   const shiny = formData.get('shiny') || false
//   const entries = formData.get('entries') || 0
//   const number = formData.get('number')
export async function addDex({
  title,
  game,
  type,
  shiny,
  entries,
  number, 
  hash
}: {
  title: string | null
  game: string | null
  type: string | null
  shiny: boolean,
  entries: number,
  number: string | null,
  hash: string
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user?.id)
    .single()

    const { error } = await supabase
    .from('pokedexes')
    .insert({
      title,
      game,
      type,
      shiny,
      username: profile?.username,
      user_id: user?.id,
      entries,
      number,
      hash
    })
    if (error) throw error
    // alert('Dex added!')
    console.log('dex added')
  } catch (e) {
    throw new Error('Error updating the data!')
  }

}

export async function addCapturedPokemon({
  number, dex
}: {
  number: string | null,
  dex: string | string[]
}) {
  // const requestUrl = new URL(request.url)
  // const formData = await request.formData()
  // const number = String(formData.get('number'))
  // const dex = String(formData.get('dex'))
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const title = typeof dex === 'string' ? dex : dex[0]

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
  .ilike('title', title.split("-").join(" "))
  .single()

  // console.log({pokedex})
  // console.log({ number, pokedex: pokedex?.id, user_id: user?.id })

  const { data: pokemon } = await supabase
  .from('captured_pokemon')
  .insert({ number, pokedex: pokedex?.id, user_id: user?.id })
  .select()
  .single()

  const { data } = await supabase.rpc('increment_pokedexes', { row_id: pokedex?.id })

  console.log({pokemon})
}

export async function removeCapturedPokemon({
  number, dex
}: {
  number: string | null,
  dex: string | string[]
}) {
  // const requestUrl = new URL(request.url)
  // const formData = await request.formData()
  // const number = String(formData.get('number'))
  // const dex = String(formData.get('dex'))
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const title = typeof dex === 'string' ? dex : dex[0]

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
  .ilike('title', title.split("-").join(" "))
  .single()

  // console.log({pokedex})
  // console.log({ number, pokedex: pokedex?.id, user_id: user?.id })

  const { data: pokemon } = await supabase
  .from('pokemon')
  .select(`id`)
  .match({ number, pokedex: pokedex?.id, user_id: user?.id })
  .single()

  // console.log({pokemon})

  const { error } = await supabase
  .from('pokemon')
  .delete()
  .match({ id: pokemon?.id, user_id: user?.id })

  const { data } = await supabase.rpc('decrement_pokedexes', { row_id: pokedex?.id })
}