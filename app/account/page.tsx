import { Metadata } from "next"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../utils/types'
import AccountForm from '../../components/auth/AccountForm'
import { createClient } from "@/utils/supabase/server"
import { Toolbar } from "@mui/material"
import Main from "@/components/Main"

export const metadata: Metadata = {
  title: 'Account',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default async function Account() {
  // const supabase = createServerComponentClient<Database>({ cookies })
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <Main>
      {/* <Toolbar sx={{ mb: 2 }} /> */}
      <AccountForm session={session} />
    </Main>
  )
}