'use client'

import Link from 'next/link'
import { Button } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'


export default function Login() {
  return (
    <Button
      // color='inherit'
      variant='outlined'
      aria-label='login'
      component={Link}
      href='/login'
      startIcon={<LoginIcon />}
    >
      Login
    </Button>
    // <Link
    //   href='/login'
    // >
    //   Login
    // </Link>
  )
}