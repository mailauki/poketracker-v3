'use client'

import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/utils/types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Container, TextField, Typography } from '@mui/material'
import SignOut from '../../components/auth/SignOutBtn'
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/client'
import AvatarForm from './AvatarForm'

export default function AccountForm({ session }: { session: Session | null }) {
  // const supabase = createClientComponentClient<Database>()
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth='xs' sx={{ pt: 2 }}>
      <Typography variant='h4' textAlign='center'>
        {`${username ? `${username}'s` : 'Your'} Account`}
      </Typography>

      <AvatarForm
        uid={user!.id}
        url={avatar_url!}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, avatar_url: url })
        }}
      />

      <TextField
        id='email'
        label='Email'
        value={session?.user.email}
        type='text'
        fullWidth
        margin='normal'
        disabled
      />
      <TextField
        id='usename'
        label='Username'
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
        type='text'
        fullWidth
        margin='normal'
      />
      <Button
        variant='contained'
        fullWidth
        size='large'
        sx={{ mt: 1, mb: 2 }}
        onClick={() => updateProfile({ username, avatar_url })}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Update'}
      </Button>
      <form action='/auth/signout'>
        <SignOut />
      </form>
    </Container>
  )
}