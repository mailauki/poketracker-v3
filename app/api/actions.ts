'use server'

import { createClient } from "@/utils/supabase/server"
import { Game } from "@/utils/types"
// import Error from "next/error"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// export async function updateUser(userId, formData) {
// }

export async function getGames() {
  // const res = await fetch('https://pokeapi.co/api/v2/version?limit=43')
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }
  // // return res.json()
  // const data = await res.json()
  // return data.results
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let { data: games, error } = await supabase
  .from('games')
  .select('*')
  .returns<Game[] | null>()

  return games
}

export async function getPokedexes(game: any) {
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
    return [{id: id, name: data.name}, {id: id+1, name: data2.name}, {id: id+2, name: data3.name}]
  } else {
    return [{id: id, name: data.name}]
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

export async function addDex(formData: FormData) {
  const title = formData.get('title')
  const game = formData.get('game')
  const type = formData.get('type')
  const shiny = formData.get('shiny') || false
  const entries = formData.get('entries') || 0
  const number = formData.get('number')
// export default async function addDex({
//   title,
//   game,
//   type,
//   shiny,
//   entries,
//   number
// }: {
//   title: string | null
//   game: string | null
//   type: string | null
//   shiny: boolean,
//   entries: number,
//   number: string | null
// }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user?.id)
    .single()

    const { error } = await supabase.from('pokedexes').insert({
      title,
      game,
      type,
      shiny,
      username: profile?.username,
      user_id: user?.id,
      entries,
      number
    })
    if (error) throw error
    // alert('Dex added!')
    console.log('dex added')
  } catch (e) {
    throw new Error('Error updating the data!')
  }

}

// export async function addCapturedPokemon() {
// }

// export async function removeCapturedPokemon() {
// }