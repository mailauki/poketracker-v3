'use client'

import { Button } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function CreateDexBtn() {
  const { pending } = useFormStatus()

  return (
    // <button type="submit" aria-disabled={pending}>
    //   Create
    // </button>
    <Button
      type="submit"
      aria-disabled={pending}
      variant='contained'
      fullWidth
      autoFocus
      size='large'
      sx={{ mt: 1, ml: 2, mb: 1, mr: 2 }}
    >
      Create
    </Button>
  )
}