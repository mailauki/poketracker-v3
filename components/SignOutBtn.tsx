'use client'

import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function SignOut() {
  return (
    // <form action='/auth/signout' method='post'>
      <Button
        type='submit'
        variant='outlined'
        color='secondary'
        fullWidth
        size='large'
        aria-label='sign out'
        startIcon={<LogoutIcon />}
      >
        Sign Out
      </Button>
    // </form>
  )
}