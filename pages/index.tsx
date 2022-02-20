import type { NextPage, GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon } from "react-share";
import ReactMarkdown from "react-markdown";
import TwoColumnsBlock from './layout/TwoColumnsBlock';
import ThreeColumnsBlock from './layout/ThreeColumnsBlock';
import ProjectContainer from "./components/ProjectContainer";
import HeadData from "./components/HeadData";
import {Projects, Homepage, Schools, Levels} from '../compilers/type'

type HomepageProps = {
  homepage: Homepage;
  projects: Projects;
  level: Levels,
  school: Schools;
};

const Home: NextPage<HomepageProps> = ({homepage, projects, school, level}) => {
  console.log("Homepage data:", homepage);
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
        <div className="hero-section__overlay"></div>
        <Container className='hero-section__title-box-container'>
          <div className='hero-section__title-box'>
            <span className="subtitle">Wellington Faculty of</span>
            <h1>{heroTitle}</h1>
            <span className="subtitle" lang="mi">Te Wāhanga Waihanga-Hoahoa</span>
          </div>
        </Container>
      </div>
      <ThreeColumnsBlock className="px-7">
        <div>
          <h3>{quickIntroTitle}</h3>
          <h5>{quickIntroTeReo}</h5>
        </div>
        <div>
          <p>{quickIntroTextColOne}</p>
        </div>
        <div>
          <p>{quickIntroTextColTwo}</p>
        </div>
      </ThreeColumnsBlock>
      <ProjectContainer projects={projects} schoolData={school} levelData={level}/>
    </>
  )
};

export async function getStaticProps() {
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

  const projectQuery = {
    populate: [
      "*",
      "ProjectThumbnail",
      "student",
      "school",
      "major",
      "level"
    ]
  };

  const [homepageRes, projectsRes, schoolRes, levelRes] = await Promise.all([
    fetchAPI("/homepage", HomepageQuery),
    fetchAPI("/projects", projectQuery),
    fetchAPI("/schools", schoolQuery),
    fetchAPI("/levels", levelQuery)
  ]);

  return {
    props: { 
      homepage: homepageRes.data, 
      projects: projectsRes.data,
      school: schoolRes.data,
      level: levelRes.data
    },
    revalidate: 1,
  };
}

export default Home
