import { Metadata } from 'next'
import AuthButton from "@/components/auth/AuthButton"
import Image from "next/image"
import { Stack, Toolbar } from '@mui/material'
import Main from '@/components/Main'
import { useSearchParams } from 'next/navigation'
import GameSelect from '@/components/dex/GameSelect'
import { getGames } from './api/actions'

export const metadata: Metadata = {
  title: {
    template: '%s | PokéTracker',
    default: 'PokéTracker',
  },
  icons: {
    // icon: '/pokeball.svg'
    icon: '/pokeball-dark.png'
  }
}

export default async function Home() {
  return (
    <Main>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>
      {/* <Stack direction="column" spacing={4} alignItems="center" sx={{ pt: 2 }}> */}
        <h1>PokéTracker</h1>
        {/* <Typography variant="h1">PokéTracker</Typography> */}

        <Image
          src="/pokeball.svg"
          alt="gotta catch 'em all"
          width={150}
          height={150}
          className="svg-pokeball"
        />

        <AuthButton />
      {/* </Stack> */}
      </div>
    </Main>
  )
}
