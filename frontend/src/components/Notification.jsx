import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Notification(){
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">Notification</Typography>
      <Typography variant="body1">Placeholder for notifications.</Typography>
    </Container>
  )
}
