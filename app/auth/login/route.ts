import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  console.log(data.session.user)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log({user})
  
  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', user?.id)
    .single()

  console.log({profile})

  return redirect(`/user/${profile?.username}`)

  // return NextResponse.redirect(requestUrl.origin, {
  //   status: 301,
  // })
}