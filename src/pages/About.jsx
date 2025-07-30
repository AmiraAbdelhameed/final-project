
import React from 'react'
import { Ayady, Contact, Hero, Mission, OurValues, Vision } from '../components/About'
import { Container } from '@mui/material'

const About = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="xl">
        <Ayady />
        <OurValues />
      </Container> 
      <Vision />
      <Mission />
      <Contact />
   
    </>
  )
}

export default About
