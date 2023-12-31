import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Check if we have a session
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  // if (session) {
  //   await supabase.auth.signOut()
  // }

  // // URL to redirect to after sign in process completes
  // return NextResponse.redirect(new URL('/', request.url), {
  //   status: 302,
  // })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  // const signOut = async () => {
  //   'use server'

  //   const cookieStore = cookies()
  //   const supabase = createClient(cookieStore)
  //   await supabase.auth.signOut()
  //   // return redirect('/login')
  //   return redirect('/')
  // }

  // URL to redirect to after sign in process completes
  // return NextResponse.redirect(requestUrl.origin)
  return NextResponse.redirect(new URL('/', request.url), {
    status: 302,
  })
}