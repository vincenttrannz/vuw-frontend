import type { NextPage } from 'next'
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import { About } from '../compilers/type'
import HeadData from "./components/HeadData";
import TextDivider from './components/TextDivider';
import TwoColumnsBlock from './layout/TwoColumnsBlock'

type AboutpageProps = {
  about: About;
}

const About: NextPage<AboutpageProps> = ({about}) => {
  console.log("About Page data:", about);
  const AboutSeoData = getStrapiData(about).SeoData;
  const AboutShareImageSeo = getStrapiData(about).SeoData.ShareImage;
  const AboutHeroBanner = getStrapiMedia(getStrapiData(about).AboutHeroBanner);
  const AboutHeroCaption = getStrapiData(about).AboutHeroBanner.data.attributes.caption;
  const AboutPageInfoBlockTitle = about.attributes.AboutPageInfoBlock.BlockTitle;
  const AboutPageInfoBlockParagraph = about.attributes.AboutPageInfoBlock.BlockParagraph;
  const AboutPageInfoBlockImage = getStrapiMedia(getStrapiData(about).AboutPageInfoBlock.BlockImage)
  return (
    <>
      <HeadData
        title={AboutSeoData.MetaTitle}
        description={AboutSeoData.MetaDescription}
        image={getStrapiMedia(AboutShareImageSeo)}
      />
      <div className="hero-section py-5"
        style={{
          backgroundImage: `url(${AboutHeroBanner})`
        }}
      >
        <div className="hero-section__overlay otherSide"></div>
        <Container className='hero-section__title-box-container'>
          <div className='hero-section__title-box otherSide'>
            <h1>About us</h1>
          </div>
        </Container>
      </div>
      <span className='p2 img-caption'>{AboutHeroCaption}</span>
      <TwoColumnsBlock className='ps-8 pe-0'>
        <div>
          <div className="textblock-with-divider">
            <h3>{AboutPageInfoBlockTitle}</h3>
            <TextDivider prime/>
          </div>
          <p className='mt-3 ps-4'>{AboutPageInfoBlockParagraph}</p>
        </div>
        <div>
          <img className='img-fluid' src={AboutPageInfoBlockImage} alt="" />
        </div>
      </TwoColumnsBlock>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const query = {
    populate: [
      "*",
      "AboutHeroBanner",
      "SeoData.ShareImage",
      "AboutPageInfoBlock",
      "AboutPageInfoBlock.BlockImage",
      "FirstContentGreyBlock",
      "ArchitectureSchool",
      "ArchitectureSchool.BlockImage",
      "SecondContentGreyBlock",
      "DesignSchool",
      "DesignSchool.BlockImage",
      "ThirdContentGreyBlock"    
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