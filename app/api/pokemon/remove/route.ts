// const { error } = await supabase
//   .from('pokemon')
//   .delete()
//   .eq('some_column', 'someValue')
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

  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
  .from('profiles')
  .select('username')
  .eq('id', user?.id)
  .single()

  const { data: pokedex } = await supabase
  .from('pokedexes')
  .select(`
    id
  `)
  .match({ user_id: user?.id })
  .ilike('title', dex.split("-").join(" "))
  .single()

  const { data: pokemon } = await supabase
  .from('pokemon')
  .select(`id`)
  .match({ number, pokedex: pokedex?.id, user_id: user?.id })
  .single()

  const { error } = await supabase
  .from('pokemon')
  .delete()
  .match({ id: pokemon?.id, user_id: user?.id })
  // .eq('id', pokemon?.id)
  // .match({ number, pokedex: pokedex?.id, user_id: user?.id })
  const { data } = await supabase.rpc('decrement_pokedexes', { row_id: pokedex?.id })

  // return NextResponse.json(data)
  return redirect(`/user/${profile?.username}/${dex}`)
}