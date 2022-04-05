import type { NextPage } from 'next';
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import PageHeroBanner from './components/views/PageHeroBanner';
import TextDivider from './components/views/TextDivider';
import ProjectContainer from "./components/ProjectContainer";
import HeadData from "./components/HeadData";
import StickyShare from './components/views/StickySocial';
import ThreeColumnsBlock from './layout/ThreeColumnsBlock';
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
      <StickyShare/>
      <PageHeroBanner
        className='home-hero'
        OtherSide={false}
        HomepageSubtitle={true}
        HeroBanner={getStrapiMedia(heroBanner)}
        HeroTitle="Architecture and Design Innovation"
      />
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
