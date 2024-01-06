'use client'

import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from 'next/link'

export default function ProfileBtn({ username }: { username: string }) {
  return (
    <Button
      component={Link}
      href={`/user/${username}`}
      variant='contained'
      fullWidth
      size='large'
      aria-label='sign out'
      startIcon={<LogoutIcon />}
    >
      View Profile
    </Button>
  )
}