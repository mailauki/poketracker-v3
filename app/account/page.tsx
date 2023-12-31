import { Metadata } from "next"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../utils/types'
import AccountForm from '../../components/AccountForm'

export const metadata: Metadata = {
  title: 'Account',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AccountForm session={session} />
}