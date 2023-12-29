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

      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2" style={{ display: 'flex', paddingLeft: '1em', paddingRight: '1em', justifyContent: 'center' }}>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center', gap: '1em' }}
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>

      <Button
        startIcon={<ChevronLeft />}
        component={Link}
        href='/'
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
            required
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            required
          />
          <Button
            variant='contained'
            type='submit'
          >
            Sign In
          </Button>
          <Button
            variant='outlined'
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