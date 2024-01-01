import { Skeleton, Stack } from "@mui/material"

export default function LoadingSkeleton() {
  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      flex="1 0 1em"
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height="100%"
      />
    </Stack>
  )
}