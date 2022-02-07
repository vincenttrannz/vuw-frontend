import type { NextPage, GetStaticProps } from 'next'
import qs from 'qs';
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon } from "react-share";
import TwoColumnsBlock from './components/TwoColumnsBlock';
import ProjectContainer from "./components/ProjectContainer";
import HeadData from "./components/HeadData";

const Home: NextPage<any> = ({homepage, projects}) => {
  console.log("Homepage data:", homepage);

  const HomepageSeoData = getStrapiData(homepage).SeoData;
  const HomepageShareImageSeo = getStrapiData(homepage).SeoData.ShareImage;
  const heroBanner = getStrapiData(homepage).hero_banner;
  const heroTitle = getStrapiData(homepage).Hero_title;
  const quickIntroTitle = getStrapiData(homepage).quick_intro_title;
  const quickIntroTeReo = getStrapiData(homepage).Quick_intro_te_reo;
  const quickIntroText = getStrapiData(homepage).Quick_intro_text_field;
  return (
    <>
      <HeadData
        title={HomepageSeoData.MetaTitle}
        description={HomepageSeoData.MetaDescription}
        image={getStrapiMedia(HomepageShareImageSeo)}
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
        <div className='me-2'>
          <h2>{quickIntroTitle}</h2>
          <h4>{quickIntroTeReo}</h4>
        </div>
        <div className='ms-2'>
          <p>{quickIntroText}</p>
        </div>
      </TwoColumnsBlock>
      <ProjectContainer projects={projects}/>
    </>
  )
};

export const getStaticProps:GetStaticProps = async (ctx) => {
  // Run API calls in parallel
  const HomepageQuery = qs.stringify({
    populate: [
      'hero_banner',
      'SeoData.ShareImage',
    ],
  }, {
    encodeValuesOnly: true,
  });

  const projectQuery = qs.stringify({
    populate: [
      "ProjectThumbnail"
    ]
  }, {
    encodeValuesOnly: true,
  })

  const [homepage, projects] = await Promise.all([
    fetchAPI(`/api/homepage?${HomepageQuery}`),
    fetchAPI(`/api/projects?${projectQuery}`)
  ]);

  return {
    props: { homepage, projects },
    revalidate: 1,
  };
}

export default Home
