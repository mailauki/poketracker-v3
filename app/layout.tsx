import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import Theme from '@/utils/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Theme>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <Header />
            {children}
          </AppRouterCacheProvider>
        </body>
      </html>
    </Theme>
  )
}
