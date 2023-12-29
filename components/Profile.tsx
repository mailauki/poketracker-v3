import { createClient } from '@/utils/supabase/server'
import { EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { useParams } from 'next/navigation'
// import { createClient } from '@/utils/supabase/client'

// import { useEffect } from 'react'

export default async function Profile() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: profiles } = await supabase.from('profiles').select()
  const { data, error } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()
  // const { session, user } = data
  // const [profiles, setProfiles] = useState<any[] | null>(null)
  // const supabase = createClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase.from('profiles').select()
  //     setProfiles(data)
  //   }
  //   getData()
  // }, [supabase])
  // const { data: { user } } = await supabase.auth.getUser()

  return (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  )
}