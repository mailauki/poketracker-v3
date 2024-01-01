import Main from "@/components/Main"
import Profile from "@/components/Profile"

export default function ProfilePage({ params }: { params: { slug: string } }) {
  return (
    <Main>
      {/* <h1>User {params?.slug}</h1> */}
      <Profile username={params.slug} />
    </Main>
  )
}