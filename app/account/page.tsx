import { Metadata } from "next"
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { Database } from '../../utils/types'
import AccountForm from './AccountForm'
import { createClient } from "@/utils/supabase/server"
// import { Toolbar } from "@mui/material"
import Main from "@/components/Main"
import { redirect } from "next/navigation"

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

  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/login')
  }
  return (
    <Main>
      {/* <Toolbar sx={{ mb: 2 }} /> */}
      <AccountForm session={session} />
    </Main>
  )
}