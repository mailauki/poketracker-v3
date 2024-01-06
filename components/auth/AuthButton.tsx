import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignOut from './SignOutBtn'
import Login from './LoginBtn'
import ProfileBtn from './ProfileBtn'
import Link from 'next/link'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user?.id)
    .single()

  return user ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      {/* Hey, {user.email}! */}
      Hello, {profile?.username}!
      <ProfileBtn username={profile?.username} />
      <form action='/auth/signout' method='post'>
        <SignOut />
      </form>
    </div>
  ) : (
    <Login />
  )
}
