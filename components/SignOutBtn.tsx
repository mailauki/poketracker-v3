'use client'

import { Button } from '@mui/material'
import Link from 'next/link'


// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

// const signOut = async () => {
//   'use server'

//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const { error } = await supabase.auth.signOut()

//   if (error) {
//     return redirect('/login?message=Could not sign out')
//   }

//   return redirect('/login?message=Successfully signed out')
// }

export default function SignOut() {
  return (
    <div>
      <form action='/auth/signout' method='post'>
        <Button
          type='submit'
          variant='outlined'
          color='secondary'
          aria-label='sign out'
        >
          Sign Out
        </Button>
      </form>
    </div>
  )
}