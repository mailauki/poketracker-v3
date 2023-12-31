import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../utils/types'
import { useCallback, useEffect, useState } from 'react'
import SignOut from './SignOutBtn'
import AuthButton from './AuthButton'
import { Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import DexForm from './DexForm'

export default async function Profile() {
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  // const { data: profiles } = await supabase.from('profiles').select()
  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', session?.user?.id)
    .single()
  // const { data: { user } } = await supabase.auth.getUser()
  // const { session, user } = data
  // const [profiles, setProfiles] = useState<any[] | null>(null)
  // const supabase = createClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase.from('profiles').select()
  //     setProfiles(data)
  //   }
  //   getData()
  // }, [supabase])
  // const { data: { user } } = await supabase.auth.getUser()

  // const [loading, setLoading] = useState(true)
  // const [username, setUsername] = useState<string | null>(null)
  // const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  // const user = session?.user

  // const getProfile = useCallback(async () => {
  //   try {
  //     setLoading(true)

  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`username, avatar_url`)
  //       .eq('id', user?.id)
  //       .single()

  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setUsername(data.username)
  //       setAvatarUrl(data.avatar_url)
  //     }
  //   } catch (error) {
  //     alert('Error loading user data!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [user, supabase])

  // useEffect(() => {
  //   getProfile()
  // }, [user, getProfile])

  // async function updateProfile({
  //   username,
  //   avatar_url,
  // }: {
  //   username: string | null
  //   avatar_url: string | null
  // }) {
  //   try {
  //     setLoading(true)

  //     const { error } = await supabase.from('profiles').upsert({
  //       id: user?.id as string,
  //       username,
  //       avatar_url,
  //       updated_at: new Date().toISOString(),
  //     })
  //     if (error) throw error
  //     alert('Profile updated!')
  //   } catch (error) {
  //     alert('Error updating the data!')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <>
      <Toolbar />
      {/* <pre>{JSON.stringify(session?.user, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      {profile?.username && (
      <Typography variant='h4' textAlign='center'>
        {`${profile.username}'s Profile`}
      </Typography>
      )}

      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Typography>{session?.user.email}</Typography>

          <DexForm />
        </Stack>
      </Container>


      {/* {session ? <SignOut /> : <></>} */}
      {/* <AuthButton /> */}
    </>
  )
}