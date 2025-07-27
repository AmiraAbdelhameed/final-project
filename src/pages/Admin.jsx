import React from 'react'
import Organization from '../components/Admin/Organization'
import Sidebar from '../components/Admin/Sidebar'
import { Divider, Grid , Container } from '@mui/material'
import { Outlet } from 'react-router'
const Admin = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={3} sx={{ minHeight: "80vh" }}>
            <Sidebar />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={7}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Admin
