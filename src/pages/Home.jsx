import Hero from '../components/Home/Hero'
import Article from '../components/Home/Article'
import Charities from '../components/Home/Charities'
import OrganizationSection from '../components/Home/OrganizationSection'
import ProjectsSection from '../components/Home/ProjectsSection'
import { Container } from '@mui/material'

const Home = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <Article />
        <Charities />
        <OrganizationSection />
        <ProjectsSection />
      </Container>
    </>
  );
};

export default Home;
