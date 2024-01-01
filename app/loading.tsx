import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  // Or a custom loading skeleton component
  // return <p>Loading...</p>
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        // height: '100%',
        flexGrow: 1
      }}
    >
      <CircularProgress
        size={60}
      />
    </Box>
  )
}