import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router'
import { Box, Container, Typography } from '@mui/material'
const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{
          minHeight: '80vh'
        }} >
          <Outlet />
        </Box>
      </Container>

      <Footer />
    </>
  )
}

export default Layout
