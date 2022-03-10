import type { NextPage } from 'next';
import React from 'react';
import HeadData from "../components/HeadData";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { fetchAPI } from "../../lib/api";
import { Project } from '../../compilers/type'
import { getStrapiMedia, getSingleStrapiMedia } from "../../lib/fetchData";
import ProjectPDF from '../components/ProjectPDF';

type ProjectProps = {
  project: Project;
}

const Project: NextPage<ProjectProps> = ({project}) => {
const projectData = project.attributes;
  // Configure settings for React Slick
  const sliderSettings = {
    dots: true,
    dotsClass: "desktop-slick slick-dots slick-thumb",
    focusOnSelect: false,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable: true,
    infinite: true,
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  // Checking the data
  // console.log(projectData);
  return (
    <>
      <HeadData
        title={projectData.ProjectTitle}
        description={projectData.SeoData.MetaDescription}
        image={getStrapiMedia(projectData.SeoData.ShareImage)}
      />
      <Container>
        <h2>{projectData.ProjectTitle}</h2>
        {
          // If the project is 3D project
          (projectData.Project3D) &&
          <div className='iframe-container'>
            <iframe title="Student Project" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-trackin="true" execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true" src={projectData.Project3DLink}></iframe>
          </div>
        }
        {
          // If the project is PDF
          (projectData.ProjectPDF) &&
          <ProjectPDF projectData={projectData}/>
        }
        {
          // If the project just contain images
          (projectData.ImagesCarousel) && 
          <Slider {...sliderSettings}>
            {
              projectData.ProjectImages.data.map((project:any, i:number) => <img alt={`${projectData.ProjectTitle} - image ${i}`} key={i} src={getSingleStrapiMedia(project)}></img>)
            }
          </Slider>
        }
        {
          // If the project is Code base
          <div>
            <iframe height="500" width="100%" scrolling="no" title={projectData.ProjectTitle} src={projectData.ProjectCodeLink} frameBorder="no" loading="lazy" allowFullScreen></iframe>
          </div>
        }
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const projects = await fetchAPI("/projects", {fields: ["slug"]});
  return {
    paths: projects.data.map((project:any) => ({
      params: {
        slug: project.attributes.Slug
      },
    })),
    fallback: 'blocking',
  };
};

export async function getStaticProps({params}:any) {
  const projectQuery = {
    filters: {
      Slug: `${params ? params.slug : ""}`
    },
    populate: ["*", "SeoData.ShareImage", "ProjectImages", "ProjectPDFLink", "student", "level", "major", "school"]
  };
  const projectsRes = await fetchAPI("/projects", projectQuery);

  return {
    props: { project: projectsRes.data[0] },
    revalidate: 1,
  }
};

export default Project;