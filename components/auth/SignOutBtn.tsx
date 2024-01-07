'use client'

import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function SignOutBtn() {
  return (
    <Button
      type='submit'
      variant='outlined'
      fullWidth
      size='large'
      aria-label='sign out'
      startIcon={<LogoutIcon />}
    >
      Sign Out
    </Button>
  )
}