'use client'

import { Divider, Tab, Tabs } from "@mui/material"

export default function PokedexTabs({
  pokedexes, active, handleChangeTab
}: {
  pokedexes: { id: number, name: string }[],
  active: number,
  handleChangeTab: any
}) {

  return (
    <>
      <Tabs
        value={active}
        onChange={handleChangeTab}
      >
        {pokedexes.map((pokedex: any) => 
          <Tab
            key={`${pokedex.id} - ${pokedex.name}`}
            value={pokedex.id}
            label={pokedex.name}
          />
        )}
      </Tabs>
      <Divider sx={{ mb: 2 }} />
    </>
  )
}