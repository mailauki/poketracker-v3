'use client'

import { PokedexTab } from "@/utils/types"
import { Chip, Divider, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material"

export default function PokedexTabs({
  pokedexes, active, handleChangeTab
}: {
  pokedexes: PokedexTab,
  active: number,
  handleChangeTab: any
}) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const entriesTotal = pokedexes.reduce((total, pokedex) => {
    const number = pokedex.entries
    return total + number
  }, 0)
  
  return (
    <>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between">
        <Tabs
          value={active}
          onChange={handleChangeTab}
        >
          {pokedexes.map((pokedex: any) => 
            <Tab
              key={pokedex.name}
              value={pokedex.id}
              label={pokedex.name.split("-").join(" ")}
            />
          )}
        </Tabs>
        {matches && <Chip label={entriesTotal} />}
      </Stack>
      <Divider sx={{ mb: 2 }} />
    </>
  )
}