import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/client'

// import { useEffect } from 'react'

export default async function Profile() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: profiles } = await supabase.from('profiles').select()
  // const [profiles, setProfiles] = useState<any[] | null>(null)
  // const supabase = createClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase.from('profiles').select()
  //     setProfiles(data)
  //   }
  //   getData()
  // }, [supabase])
  return (
    <pre>{JSON.stringify(profiles, null, 2)}</pre>
  )
}