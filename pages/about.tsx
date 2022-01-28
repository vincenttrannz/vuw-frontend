import type { NextPage } from 'next'
import { Container } from "react-bootstrap";
import HeadData from "./components/HeadData";

const About: NextPage = () => {
  return (
    <>
      <HeadData
        title='VUW About page'
        description='Welcome to VUW About page'
        image='https://vuw-backend.herokuapp.com/uploads/vuw_thumb_590e71f80d.jpeg'
      />
      <Container>
        <h1>About page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem minus ipsa atque, illum similique aspernatur dolores ea officiis asperiores rerum! Soluta aut explicabo placeat obcaecati dolorem impedit aspernatur quisquam saepe!</p>
      </Container>
    </>
  );
}

export default About;