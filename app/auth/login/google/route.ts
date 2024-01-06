import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback`,
    }
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user?.id)
    .single()

  return redirect(`/user/${profile?.username}`)

  // return NextResponse.redirect(requestUrl.origin, {
  //   status: 301,
  // })
}