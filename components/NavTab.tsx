import { Button, Divider, Tab, useTheme } from "@mui/material"
import Link from "next/link"
import { ReactElement } from "react"

export default function NavTab({ href, value, label, icon }: { href: string, value: string, label: string, icon: ReactElement }) {
  const theme = useTheme()

  return (
    <>
      <Tab
        component={href == '/signout' ? Button : Link}
        href={href == '/signout' ? '' : href}
        type={href == '/signout' ? 'submit' : ''}
        color='primary'
        value={href}
        label={label}
        icon={icon}
        iconPosition='start'
        sx={{
          width: '100%',
          display: label == 'login' ? 'none' : '',
          minHeight: '60px',
          justifyContent: 'flex-start',
          '&:hover': { bgcolor: theme.palette.action.hover }
        }}
      />
      {label == 'login' && <Divider />}
    </>
  )
}