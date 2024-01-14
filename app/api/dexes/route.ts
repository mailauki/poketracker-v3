// import { NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'

// export async function POST(request: Request) {
//   // const { title, game, type } = await request.json()
//   const requestUrl = new URL(request.url)
//   const formData = await request.formData()
//   const title = String(formData.get('title'))
//   const game = String(formData.get('game'))
//   const type = String(formData.get('type'))
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const { data: { user } } = await supabase.auth.getUser()
  
//   const { data: profile } = await supabase
//   .from('profiles')
//   .select('username')
//   .eq('id', user?.id)
//   .single()

//   const { data } = await supabase.from('pokedexes')
//   .insert({
//     title,
//     game,
//     type,
//     username: profile?.username,
//     user_id: user?.id,
//     entries: 0
//   })
//   .select()

//   return NextResponse.json(data)
// }