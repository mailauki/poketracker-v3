import { Metadata } from 'next'
import AuthButton from "@/components/AuthButton"
import Image from "next/image"

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

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>
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
      </div>
    </>
  )
}
