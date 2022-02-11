import type { NextPage } from 'next'
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import { About } from '../compilers/type'
import HeadData from "./components/HeadData";

type AboutpageProps = {
  about: About;
}

const About: NextPage<AboutpageProps> = ({about}) => {
  console.log("About Page data:", about);
  const AboutSeoData = getStrapiData(about).SeoData;
  const AboutShareImageSeo = getStrapiData(about).SeoData.ShareImage;
  const AboutTitle = getStrapiData(about).AboutTitle;
  const AboutShortDescription = getStrapiData(about).AboutShortDescription;
  return (
    <>
      <HeadData
        title={AboutSeoData.MetaTitle}
        description={AboutSeoData.MetaDescription}
        image={getStrapiMedia(AboutShareImageSeo)}
      />
      <Container>
        <h1>{AboutTitle}</h1>
        <p>{AboutShortDescription}</p>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const query = {
    populate: [
      "SeoData.ShareImage"
    ],
  };
  const [aboutRes] = await Promise.all([
    fetchAPI("/about", query)
  ]);

  return {
    props: { about: aboutRes.data },
    revalidate: 1,
  };
}

export default About;