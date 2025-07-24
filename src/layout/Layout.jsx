import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router'
import { Box, Typography } from '@mui/material'
import Hero from '../components/Home/Hero'
import Article from '../components/Home/Article'
import Charities from '../components/Home/Charities'
import Postarticles from '../components/Home/Postarticles'
import Newepisodes from '../components/Home/Newepisodes'
const Layout = () => {
  return (
    <>
      <Navbar />
   
      <Outlet />
     
      <Footer />
    </>
  )
}

export default Layout
