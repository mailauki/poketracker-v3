'use client'

import { Skeleton, Stack } from "@mui/material"

export default function LoadingSkeleton() {
  return (
    // <Stack
    //   direction="column"
    //   width="100%"
    //   height="100%"
    //   flex="1 0 1em"
    //   minHeight="20rem"
    // >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ minHeight: "20em"}}
      />
    // </Stack>
  )
}