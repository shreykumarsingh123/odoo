import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Dashboard() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">Dashboard</Typography>
      <Typography variant="body1">This is the main dashboard page.</Typography>
    </Container>
  )
}
