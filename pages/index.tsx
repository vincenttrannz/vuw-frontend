import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link';
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { Container } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon } from "react-share";
import TwoColumnsBlock from './components/TwoColumnsBlock';
import HeadData from "./components/HeadData";

const Home: NextPage<any> = ({homepage}) => {
  console.log(homepage);
  const heroBanner = homepage.data.attributes.hero_banner;
  const heroTitle = homepage.data.attributes.Hero_title;
  const quickIntroTitle = homepage.data.attributes.quick_intro_title;
  const quickIntroTeReo = homepage.data.attributes.Quick_intro_te_reo;
  const quickIntroText = homepage.data.attributes.Quick_intro_text_field;
  return (
    <>
      <HeadData
        title='VUW Homepage'
        description='Welcome to VUW Homepage'
      />
      {/* <FacebookShareButton
        url="https://vic-design.herokuapp.com/"
        quote="Homepage of VUW Project"
        hashtag="#helloVUW"
      >
        <FacebookIcon size={36} />
      </FacebookShareButton>
      <Link href={`/about`}>About page</Link> */}
      <div className='hero-section py-5'
        style={{
          backgroundImage: `url(${getStrapiMedia(heroBanner)})`
        }}
      >
        <Container>
          <h1>{heroTitle}</h1>
        </Container>
      </div>
      <TwoColumnsBlock>
        <div className='mx-2'>
          <h2>{quickIntroTitle}</h2>
          <h4>{quickIntroTeReo}</h4>
        </div>
        <div className='mx-2'>
          <p>{quickIntroText}</p>
        </div>
      </TwoColumnsBlock>
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepage] = await Promise.all([
    fetchAPI("/api/homepage?populate=*"),
  ]);

  return {
    props: { homepage },
    revalidate: 1,
  };
}

export default Home
