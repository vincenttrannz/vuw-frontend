import type { NextPage } from 'next';
import React from 'react';
import Link from 'next/link'
import HeadData from "../components/HeadData";
import { Container } from "react-bootstrap";
import { fetchAPI } from "../../lib/api";
import { Project } from '../../compilers/type';
import { getStrapiMedia, getSingleStrapiMedia } from "../../lib/fetchData";
import ReactMarkdown from 'react-markdown'
import TextDivider from '../components/views/TextDivider';
import ProjectPDF from '../components/views/ProjectPDF';
import ProjectCarousel from '../components/views/ProjectCarousel';
import Project3D from '../components/views/Project3D';
import ProjectCode from '../components/views/ProjectCode';
import FacebookShare from '../../public/round-fb-logo.svg';
import LinkedInShare from '../../public/round-linkedin-logo.svg';
import TwitterShare from '../../public/round-twitter-logo.svg';
import CopyLinkShare from '../../public/round-copy-link-logo.svg';

type ProjectProps = {
  project: Project;
}

const Project: NextPage<ProjectProps> = ({project}) => {
  const projectData = project.attributes;

  // Checking the data
  console.log(projectData);
  return (
    <>
      <HeadData
        title={projectData.ProjectTitle}
        description={projectData.SeoData.MetaDescription}
        image={getStrapiMedia(projectData.SeoData.ShareImage)}
      />
      <div className='vic-work__wrapper'>
        <Container className='vic-work__left-container'>
          details
        </Container>
        <Container className='vic-work__right-container'>
          <div className="textblock-with-divider">
            <h1 className='h2'>{projectData.ProjectTitle}</h1>
            <TextDivider prime/>
          </div>
          <div className="project-wrapper mt-3">
            <div className="project-info-container">
              {
                // If the project is 3D project
                (projectData.Project3D) &&
                <Project3D projectData={projectData}/>
              }
              {
                // If the project is PDF
                (projectData.ProjectPDF) &&
                <ProjectPDF projectData={projectData}/>
              }
              {
                // If the project just contain images
                (projectData.ImagesCarousel) && 
                <ProjectCarousel projectData={projectData}/>
              }
              {
                // If the project is Code base
                (projectData.ProjectCode) &&
                <ProjectCode projectData={projectData}/>
              }
              <div className='project-info-container__details'>
                <div className='project-info-container__details__left'>
                  {
                    [projectData.ProjectDescription, projectData.LecturerName, projectData.CourseName, projectData.ProjectDate].map((el, i:number) => {
                      if(el !== null){
                        return (
                          <div key={i} className='project-info-container__details__text-wrapper-row'>
                            <h6>
                              {
                                (i == 0) ? "Overview:" : (i == 1) ? "Lecturer:" : (i == 2) ? "Course:" : (i == 3) ? "Date:" : ""
                              }
                            </h6>
                            <ReactMarkdown>{el}</ReactMarkdown>
                          </div>
                        )
                      } else {
                        return ""
                      }
                    })
                  }
                </div>
                <div className='project-info-container__details__right'>
                  {
                    (projectData.ProjectExternalLink !== null) &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Project link:</h6>
                      <Link href={projectData.ProjectExternalLink}>
                        <a target="_blank">{projectData.ProjectLinkDisplay}</a>
                      </Link>
                    </div>
                  }
                  {
                    (projectData.DownloadLinkOne !== null || projectData.DownloadLinkTwo !== null) &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Download:</h6>
                      {
                        (projectData.DownloadLinkOne !== null && projectData.DownloadLinkOne !== "") ?
                        <Link href={projectData.DownloadLinkOne}>
                          <a target="_blank">{projectData.DownloadLinkOneNameDisplay}</a>
                        </Link>
                        : ""
                      }
                      {
                        (projectData.DownloadLinkTwo !== null && projectData.DownloadLinkTwo !== "") ?
                        <Link href={projectData.DownloadLinkTwo}>
                          <a target="_blank">{projectData.DownloadLinkTwoNameDisplay}</a>
                        </Link>
                        : ""
                      }
                    </div>
                  }                     
                  {
                    (projectData.LicensingLink !== null) &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Project link:</h6>
                      <Link href={projectData.LicensingLink}>
                        <a target="_blank">{projectData.LicensingNameDisplay}</a>
                      </Link>
                    </div>
                  }
                  {
                    (projectData.ProjectTags !== null && projectData.ProjectTags !== "") &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Tags:</h6>
                      <p>{projectData.ProjectTags.split(",").join(", ")}</p>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className='project-share-container'>
              <FacebookShare className="share-logo"/>
              <LinkedInShare className="share-logo"/>
              <TwitterShare className="share-logo"/>
              <CopyLinkShare className="share-logo"/>
            </div>
          </div>
        </Container>
      </div>
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
    populate: ["*", "SeoData.ShareImage", "ProjectImages", "ProjectPDFLink", "student", "level", "major", "school", "award"]
  };
  const projectsRes = await fetchAPI("/projects", projectQuery);

  return {
    props: { project: projectsRes.data[0] },
    revalidate: 1,
  }
};

export default Project;