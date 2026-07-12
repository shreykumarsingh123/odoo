import React from 'react'
import { Container, Typography, Box, Button } from '@mui/material'

export default function AdminPanel({ onLogout }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Admin Panel</Typography>
        <Button variant="outlined" color="error" onClick={onLogout}>Logout</Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>Overview</Typography>
      <Typography variant="body1">This is the admin dashboard. Add admin-only controls here (user management, metrics, etc.).</Typography>

    </Container>
  )
}
