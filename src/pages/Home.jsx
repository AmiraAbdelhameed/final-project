import Hero from "../components/Home/Hero";
import Article from "../components/Home/Article";
import Charities from "../components/Home/Charities";
import Postarticles from "../components/Home/Postarticles";
import Newepisodes from "../components/Home/Newepisodes";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <Article />
        <Charities />
        <Postarticles />
        <Newepisodes />
      </Container>
    </>
  );
};

export default Home;
