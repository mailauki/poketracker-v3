'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Alert, Button, Container, Divider, Link as Anchor, Stack, TextField, Toolbar, Typography, useTheme, InputAdornment, IconButton } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
// import { useFormStatus } from 'react-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/utils/types'
import { purple } from '@mui/material/colors'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

export default function AuthForm({
  searchParams, signIn, signUp
}: {
  searchParams: { message: string },
  signIn: (formData: FormData) => void,
  signUp: (formData: FormData) => void
}) {
  const supabase = createClientComponentClient<Database>()
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [haveAccount, setHaveAccount] = useState(true)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleFormToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setHaveAccount(!haveAccount)
  }

  return (
    <>
      <Toolbar />

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
        <Auth
          supabaseClient={supabase}
          view='sign_in'
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: theme.palette.secondary.main,
                  brandAccent: purple[400],
                  brandButtonText: theme.palette.secondary.contrastText
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Password',
                button_label: 'Sign In',
                loading_button_label: 'Signing In...',
                'link_text': "Already have an account? Sign In"
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Password',
                button_label: 'Sign Up',
                loading_button_label: 'Signing Up...',
                'link_text': "Don't have an account? Sign Up"
              },
              forgotten_password: {
                email_label: 'Email',
                password_label: 'Password'
              }
            }
          }}
          theme={theme.palette.mode}
          providers={[]}
          redirectTo='/auth/callback'
        />

        <Divider sx={{ mb: 3 }} />

        <Stack
          direction='column'
          spacing={2}
          component='form'
          action={haveAccount ? signIn : signUp}
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
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            name='password'
            color='secondary'
            required
          />
          {haveAccount ? (
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              role='button'
            >
              Sign In
            </Button>
          ) : (
            <Button
              // variant='outlined'
              variant='contained'
              color='secondary'
              type='submit'
              // formAction={signUp}
            >
              Sign Up
            </Button>
          )}
          <Anchor
            textAlign='center'
            color='text.secondary'
            variant='caption'
            component='button'
            onClick={handleFormToggle}
          >
            {haveAccount ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Anchor>
          {searchParams?.message && (
            <Alert severity='warning'>
              {searchParams.message}
            </Alert>
          )}
        </Stack>
      </Container>
    </>
  )
}