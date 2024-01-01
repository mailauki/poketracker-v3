import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignOut from './SignOutBtn'
import Login from './LoginBtn'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // const signOut = async () => {
  //   'use server'

  //   const cookieStore = cookies()
  //   const supabase = createClient(cookieStore)
  //   await supabase.auth.signOut()
  //   // return redirect('/login')
  //   return redirect('/')
  // }

  return user ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      Hey, {user.email}!
      <form action='/auth/signout' method='post'>
        <SignOut />
      </form>
    </div>
  ) : (
    <Login />
  )
}
