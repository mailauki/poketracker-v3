import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const { title, game, type } = await request.json()
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  console.log(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user?.id)
    .single()

  const { data } = await supabase.from('pokedexes').insert({
    title: title,
    game: game,
    type: type,
    user: profile?.username,
    user_id: user?.id
  }).select()

  return NextResponse.json(data)
}