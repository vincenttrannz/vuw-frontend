import type { NextPage, GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import { FacebookShareButton } from "react-share";
import InstaIcon from '../public/insta-logo.svg'
import FacebookIcon from '../public/fb-logo.svg'
import TextDivider from './components/TextDivider';
import ThreeColumnsBlock from './layout/ThreeColumnsBlock';
import ProjectContainer from "./components/ProjectContainer";
import HeadData from "./components/HeadData";
import {Projects, Homepage, Schools, Levels, Awards} from '../compilers/type'

type HomepageProps = {
  homepage: Homepage;
  projects: Projects;
  levels: Levels,
  schools: Schools;
  awards: Awards;
};

const Home: NextPage<HomepageProps> = ({homepage, projects, schools, levels, awards}) => {
  // console.log("Homepage data:", homepage);
  const HomepageSeoData = getStrapiData(homepage).SeoData;
  const HomepageShareImageSeo = getStrapiData(homepage).SeoData.ShareImage;
  const heroBanner = getStrapiData(homepage).hero_banner;
  const heroTitle = getStrapiData(homepage).Hero_title;
  const quickIntroTitle = getStrapiData(homepage).quick_intro_title;
  const quickIntroTeReo = getStrapiData(homepage).Quick_intro_te_reo;
  const quickIntroTextColOne = getStrapiData(homepage).Quick_intro_text_column_one;
  const quickIntroTextColTwo = getStrapiData(homepage).Quick_intro_text_column_two;
  return (
    <>
      <HeadData
        title={HomepageSeoData.MetaTitle}
        description={HomepageSeoData.MetaDescription}
        image={getStrapiMedia(HomepageShareImageSeo)}
      />
      <div className='side-share-container shadow-sm'>
        <FacebookShareButton
          url="https://vuw-frontend.vercel.app/"
          quote="Homepage of VUW Project"
          hashtag="#helloVUW"
        >
          <FacebookIcon/>
        </FacebookShareButton>
        <InstaIcon/>
      </div>
      <div className='hero-section py-5'
        style={{
          backgroundImage: `url(${getStrapiMedia(heroBanner)})`
        }}
      >
        <div className="hero-section__overlay"></div>
        <Container className='hero-section__title-box-container'>
          <div className='hero-section__title-box'>
            <span className="subtitle">Wellington Faculty of</span>
            <h1>Architecture and Design Innovation</h1>
            <span className="subtitle" lang="mi">Te Wāhanga Waihanga-Hoahoa</span>
          </div>
        </Container>
      </div>
      <ThreeColumnsBlock className="px-sm-3 px-xl-7">
        <div className="textblock-with-divider">
          <h3>{quickIntroTitle}</h3>
          <TextDivider prime/>
          <h5>{quickIntroTeReo}</h5>
        </div>
        <div>
          <p>{quickIntroTextColOne}</p>
        </div>
        <div>
          <p>{quickIntroTextColTwo}</p>
        </div>
      </ThreeColumnsBlock>
      <ProjectContainer projects={projects} schoolData={schools} levelData={levels} awardData={awards}/>
    </>
  )
};

export async function getStaticProps() {
  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }

  // Run API calls in parallel
  const HomepageQuery = {
    populate: [
      'hero_banner',
      'SeoData.ShareImage',
    ],
  };

  const schoolQuery = {
    populate: "*"
  };

  const levelQuery = {
    populate: "*"
  }

  const awardQuery = {
    populate: "*"
  }

  const projectQuery = {
    populate: [
      "*",
      "ProjectThumbnail",
      "student.award",
      "school",
      "major",
      "level",
      "award"
    ]
  };

  const [homepageRes, projectsRes, schoolRes, levelRes, awardRes] = await Promise.all([
    fetchAPI("/homepage", HomepageQuery),
    fetchAPI("/projects", projectQuery),
    fetchAPI("/schools", schoolQuery),
    fetchAPI("/levels", levelQuery),
    fetchAPI("/awards", awardQuery)
  ]);

  return {
    props: { 
      homepage: homepageRes.data, 
      projects: projectsRes.data.sort(() => 0.5 - Math.random()),
      schools: schoolRes.data,
      levels: levelRes.data,
      awards: awardRes.data
    },
    revalidate: 1,
  };
}

export default Home
