
import { Ayady,Hero,OurValues } from '../components/About'
import { Container } from '@mui/material'

const About = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="xl">
        <Ayady />
        <OurValues />
      </Container> 
   
   
    </>
  )
}

export default About
