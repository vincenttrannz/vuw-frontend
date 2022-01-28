import type { NextPage } from 'next'
import qs from 'qs';
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import HeadData from "./components/HeadData";

const About: NextPage<any> = ({about}) => {
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
  const query = qs.stringify({
    populate: [
      "SeoData.ShareImage"
    ],
  }, {
    encodeValuesOnly: true,
  });
  const [about] = await Promise.all([
    fetchAPI(`/api/about?${query}`)
  ]);

  return {
    props: { about },
    revalidate: 1,
  };
}

export default About;