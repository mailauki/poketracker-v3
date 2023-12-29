import { Button } from "@mui/material"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const signOut = async () => {
  'use server'

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/login?message=Could not sign out')
  }

  return redirect('/login?message=Successfully signed out')
}

export default function SignOut() {

  return (
    // <Button
    //   color='inherit'
    //   aria-label='sign out'
    //   onClick={signOut}
    // >
    //   Sign Out
    // </Button>
    <button>Sign Out</button>
  )
}