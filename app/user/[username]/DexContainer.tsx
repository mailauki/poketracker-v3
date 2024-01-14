// 'use client'

import { Stack } from "@mui/material"
import DexCard from "./DexCard"
import { Dex } from "@/utils/types"
import DexHeader from "./[dex]/DexHeader"

export default async function DexContainer({ dexes }: { dexes: Dex[] | null }) {
  return (
    <Stack spacing={6} sx={{ mt: 3 }}>
      {dexes?.map((dex: Dex) => (
        <DexCard
          key={dex.id}
          dex={dex}
        />
        // <DexHeader  />
      ))}
    </Stack>
  )
}