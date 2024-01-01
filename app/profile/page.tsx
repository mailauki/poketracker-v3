import { Metadata } from "next"
import styles from "../page.module.css"
import Profile from "@/components/Profile"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { Toolbar } from "@mui/material"
import Main from "@/components/Main"

export const metadata: Metadata = {
  title: 'Profile',
  icons: {
    icon: '/pokeball-dark.png'
  }
}

export default function ProfilePage() {
  return (
    // <Profile />
    <Main>
      {/* <Toolbar sx={{ mb: 2 }} /> */}
      <LoadingSkeleton />
    </Main>
  )
}