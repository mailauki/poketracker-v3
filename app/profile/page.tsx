import { Metadata } from "next"
import Profile from "@/components/Profile"

export const metadata: Metadata = {
  title: 'Profile',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default function ProfilePage() {
  return (
    <Profile />
  )
}