import { Metadata } from 'next'
import AuthForm from '@/components/auth/AuthForm'
import Main from '@/components/Main'

export const metadata: Metadata = {
  title: 'Login',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <Main>
      <AuthForm
        searchParams={searchParams}
      />
    </Main>
  )
}