'use client'

import Link from 'next/link'
import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

export default function LoginBtn() {
  return (
    <Button
      variant='outlined'
      aria-label='login'
      component={Link}
      href='/login'
      startIcon={<LoginIcon />}
    >
      Login
    </Button>
  )
}