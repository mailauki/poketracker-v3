import Link from 'next/link'
import { Metadata } from 'next'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// import { Auth } from '@supabase/auth-ui-react'
import { Button, Container, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    console.log({email}, {password})

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    console.log({email}, {password})

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <>
      <Toolbar />

      <div style={{ display: 'flex', padding: '1em', justifyContent: 'center' }}>
        <form
          style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center', gap: '1em' }}
          action={signIn}
        >
          <label htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button>
            Sign In
          </button>
          <button
            formAction={signUp}
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p>
              {searchParams.message}
            </p>
          )}
        </form>
      </div>

      <Button
        startIcon={<ChevronLeft />}
        component={Link}
        href='/'
        color='secondary'
        sx={{ ml: 2, mt: 2 }}
      >
        Back
      </Button>

      <Container maxWidth='xs'>
        <Stack
          direction='column'
          spacing={2}
          component='form'
          action={signIn}
        >
          <TextField
            label='Email'
            type='text'
            name='email'
            color='secondary'
            required
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            color='secondary'
            required
          />
          <Button
            variant='contained'
            color='secondary'
            type='submit'
          >
            Sign In
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            type='submit'
            formAction={signUp}
          >
            Sign Up
          </Button>
          {searchParams?.message && (
            <Typography
              textAlign='center'
            >
              {searchParams.message}
            </Typography>
          )}
        </Stack>
      </Container>
      {/* <Auth supabaseClient={supabase}  /> */}
    </>
  )
}