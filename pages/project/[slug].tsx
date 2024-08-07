import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import $ from 'jquery';
import { Container } from "react-bootstrap";
import { fetchAPI } from "../../lib/api";
import { Project, Projects } from '../../compilers/type';
import { getStrapiMedia } from "../../lib/fetchData";
import HeadData from "../components/HeadData";
import TextDivider from '../components/views/TextDivider';
import VicButton from '../components/views/VicButton';
import ProjectPDF from '../components/views/ProjectPDF';
import ProjectCarousel from '../components/views/ProjectCarousel';
import Project3D from '../components/views/Project3D';
import ProjectCode from '../components/views/ProjectCode';
import ProjectVideo from '../components/views/ProjectVideo';
import OtherProjects from '../components/views/OtherProjects';
import ShareContainer from '../components/views/ShareContainer';

type ProjectProps = {
  project: Project;
  randomThreeProjects: Projects;
}

const ProjectPage: NextPage<ProjectProps> = ({project, randomThreeProjects}) => {
  const projectData = project.attributes;  
  const router = useRouter();

  const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  const GoBack = () => {
    window.scrollTo({
      top: 0
    })
    router.push("/");
  }

  const ProjectLink = (ProjectLinkDisplay:string, ProjectLink:string, i?:number) => {
    return (
      <Link key={i} href={ProjectLink}>
        <a target="_blank">{ProjectLinkDisplay}</a>
      </Link>
    )
  }

  const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  useEffect(() => {
    const DetailsContent = document.querySelectorAll(".details-content");
    Array.from(DetailsContent).forEach(content => {
      if(validateEmail($(content.children).html()) !== null) {
        content.innerHTML = `<a href="mailto:${$(content.children).html()}">${$(content.children).html()}</a>`
      }
    });
  }, [])

  // Checking the data
  console.log(projectData);
  // console.log(randomThreeProjects);

  return (
    <>
      <HeadData
        title={projectData.ProjectTitle}
        description={projectData.ProjectDescription}
        image={getStrapiMedia(projectData.ProjectThumbnail)}
      />
      <div className='vic-work__wrapper'>
        <Container className='vic-work__left-container'>
          <VicButton
            variant='vic'
            btnType='prev'
            btnText='Back'
            className='prev-btn mb-3 d-none d-lg-flex'
            ClickFunc={GoBack}
          />
          <div className='work-details-container'>
            {
              // Student Name and description
              <div className='textblock-with-divider'>
                <h4 tabIndex={0}>{projectData.student.data.attributes?.StudentName}</h4>
                <TextDivider prime={false}/>
                <div tabIndex={0}>
                  <ReactMarkdown className='details-content'>
                    {
                      (projectData.student.data.attributes?.StudentShortDetail !== null && projectData.student.data.attributes?.StudentShortDetail !== "") 
                      ?
                      String(projectData.student.data.attributes?.StudentShortDetail)
                      :
                      ""
                    }
                  </ReactMarkdown>
                </div>
              </div>
            }
            {
              // Student Major
              (projectData.student.data.attributes?.major.data !== null) &&
              <div tabIndex={0} className='textblock-with-divider'>
                <h6>Major</h6>
                <TextDivider prime={false}/>
                <ReactMarkdown className='details-content'>
                  {String(projectData.student.data.attributes?.major.data.attributes.MajorName)}
                </ReactMarkdown>
              </div>
            }
            {
              // Student Minor and Email
              [projectData.student.data.attributes?.StudentMinor, 
              projectData.student.data.attributes?.StudentEmail].map((StudentDetail:any, i:number) => {
                if(StudentDetail !== null && StudentDetail !== "") {
                  return (
                    <div tabIndex={0} key={i} className='textblock-with-divider'>
                      {
                        (i == 0)  ? <h6>Minor</h6> : (i == 1) ? <h6>Email</h6> : ""
                      }
                      <TextDivider prime={false}/>
                      <ReactMarkdown className='details-content'>{StudentDetail}</ReactMarkdown>
                    </div>
                  )
                }
              })
            }
            {
              (
                projectData.student.data.attributes?.FirstStudentLink !== null &&
                projectData.student.data.attributes?.FirstStudentLink !== "" ||
                projectData.student.data.attributes?.SecondStudentLink !== null &&
                projectData.student.data.attributes?.SecondStudentLink !== "" ||
                projectData.student.data.attributes?.ThirdStudentLink !== null &&
                projectData.student.data.attributes?.ThirdStudentLink !== "" ||
                projectData.student.data.attributes?.FourthStudentLink !== null &&
                projectData.student.data.attributes?.FourthStudentLink !== ""
              ) &&
              <div tabIndex={0} className='textblock-with-divider'>
                <h6>Links</h6>
                <TextDivider prime={false}/>
                <div className='details-content'>
                  {
                    [
                      projectData.student.data.attributes?.FirstStudentLink,
                      projectData.student.data.attributes?.SecondStudentLink,
                      projectData.student.data.attributes?.ThirdStudentLink,
                      projectData.student.data.attributes?.FourthStudentLink
                    ].map((el, i:number) => {
                      return (
                        (el !== null) ? ProjectLink(String(el), String(el), i) : ""
                      )
                    })
                  }
                </div>
              </div>
            }
          </div>
        </Container>
        <Container className='vic-work__right-container'>
          <div className="textblock-with-divider">
            <h1 tabIndex={0} className='h2'>{projectData.ProjectTitle}</h1>
            <TextDivider prime/>
          </div>
          <div className="project-wrapper mt-3">
            <div className="project-info-container">
              {
                // Project hero image
                <div className='image-container'>
                  <Image
                    src={getStrapiMedia(projectData.ProjectThumbnail)}
                    alt={projectData.ProjectThumbnail.data.attributes.alternativeText}
                    layout='fill'
                    objectFit='cover'
                    priority={true}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      convertImage(1920, 1080)
                    )}`}
                  />
                </div>
              }
              <div className='project-info-container__details'>
                <div className='project-info-container__details__left'>
                  {
                    [projectData.ProjectDescription, projectData.student.data.attributes?.StudentName, projectData.LecturerName, projectData.CourseName, new Date(projectData.ProjectDate).getFullYear().toString()].map((el:any, i: number) => {
                      if(el !== null && el !== ""){
                        return (
                          <div tabIndex={0} key={i} className={`project-info-container__details__text-wrapper-row ${(i == 1) ? "student" : ""}`}>
                            <h6>
                              {
                                (i == 0) ? "Overview:" : (i == 1) ? "Student:" : (i == 2) ? "Lecturer:" : (i == 3) ? "Course:" : (i == 4) ? "Published:" : ""
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
                  {
                    /**
                     * AWARD CONTENT FOR PROJECT
                     */
                    (projectData.award.data !== null) 
                    ?
                    <div className='project-info-container__details__text-wrapper-row'>
                      <h6>Award:</h6>
                      {
                        <div className='project-info-container__details__text-wrapper-award-content'>
                          {
                            (projectData.student.data.attributes?.award.data !== null) &&
                            <div className='project-info-container__details__text-wrapper-award-content__text-wrap'>
                              <img className='company-logo' src="/award-ribbon.svg" alt="Award Ribbon"/>
                              <span>{projectData.student.data.attributes?.award.data.attributes.AwardName}</span>
                            </div>
                          }
                          <div className='project-info-container__details__text-wrapper-award-content__text-wrap'>
                            <img className='company-logo' src="/award-ribbon.svg" alt="Award Ribbon"/>
                            <span>{projectData.award.data.attributes.AwardName}</span>
                          </div>
                          <div className='project-info-container__details__text-wrapper-award-content__text-wrap'>
                            <img className="company-logo" src={getStrapiMedia(projectData.award.data.attributes.CompanyLogo)} alt="Company logo" />
                            <Link href={projectData.award.data.attributes.CompanyLink}>
                              <a target="_blank">{projectData.award.data.attributes.CompanyName}</a>
                            </Link>
                          </div>
                        </div>
                      }
                    </div>
                    :
                    (projectData.student.data.attributes?.award.data !== null)
                    ?
                    <div className='project-info-container__details__text-wrapper-row'>
                      <h6>Award:</h6>
                      <div className='project-info-container__details__text-wrapper-award-content__text-wrap'>
                        <img className='company-logo' src="/award-ribbon.svg" alt="Award Ribbon"/>
                        <span>{projectData.student.data.attributes?.award.data.attributes.AwardName}</span>
                      </div>
                    </div>
                    :
                    ""
                  }
                </div>
                <div className='project-info-container__details__right'>
                  {
                    (projectData.ProjectExternalLink !== null) &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Project link:</h6>
                      {ProjectLink(projectData.ProjectLinkDisplay, projectData.ProjectExternalLink)}
                    </div>
                  }
                  {
                    (projectData.DownloadLinkOne !== null || projectData.DownloadLinkTwo !== null) &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Download:</h6>
                      {
                        (projectData.DownloadLinkOne !== null && projectData.DownloadLinkOne !== "") ?
                        ProjectLink(projectData.DownloadLinkOneNameDisplay, projectData.DownloadLinkOne)
                        : ""
                      }
                      {
                        (projectData.DownloadLinkTwo !== null && projectData.DownloadLinkTwo !== "") ?
                        ProjectLink(projectData.DownloadLinkTwoNameDisplay, projectData.DownloadLinkTwo)
                        : ""
                      }
                    </div>
                  }                     
                  {
                    (projectData.LicensingLink !== null && projectData.LicensingLink !== "") &&
                    <div className='project-info-container__details__text-wrapper-column'>
                      <h6>Licensing:</h6>
                      {ProjectLink(projectData.LicensingNameDisplay, projectData.LicensingLink)}
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
                <ShareContainer className='d-flex d-lg-none my-2'/>
                <VicButton
                  variant='vic'
                  btnType='prev'
                  btnText='Back'
                  className='prev-btn mb-3 d-flex d-lg-none'
                  ClickFunc={GoBack}
                />
              </div>
              {
                // If the project is 3D project
                (projectData.Project3D) &&
                <Project3D 
                  Project3DLink={projectData.Project3DLink}
                  Project3DCaption={projectData.ProjectCaption}
                />
              }
              {
                // If the project is PDF
                (projectData.ProjectPDF) &&
                <ProjectPDF 
                  ProjectPDFLink={getStrapiMedia(projectData.ProjectPDFLink)}
                  ProjectPDFCaption={projectData.ProjectCaption}
                />
              }
              {
                // If the project just contain images
                (projectData.ImagesCarousel) && 
                <ProjectCarousel projectData={projectData}/>
              }
              {
                // If the project is Code base
                (projectData.ProjectCode) &&
                <ProjectCode
                  ProjectCodeLink={projectData.ProjectCodeLink}
                  ProjectCodeCaption={projectData.ProjectCaption}
                />
              }
              {
                // If the project is Video base
                (projectData.ProjectVideo) &&
                <ProjectVideo
                  ProjectVideoLink={projectData.ProjectVideoLink}
                  ProjectVideoCaption={projectData.ProjectCaption}
                />
              }
              <div className='sub-project-container py-3'>
                {
                  /**
                   * SUB PROJECT CAROUSEL
                   */
                  (projectData.SubProjectCarousel !== null) &&
                  <ProjectCarousel projectData={projectData.SubProjectCarousel}/>
                }
                {
                  /**
                   * SUB PROJECT 3D
                   */
                  (projectData.SubProject3D !== null) &&
                  <Project3D 
                    Project3DLink={projectData.SubProject3D.Project3DLink}
                    Project3DCaption={projectData.SubProject3D.ProjectCaption}
                  />
                }
                {
                  /**
                   * SUB PROJECT PDF
                   */
                  (projectData.SubProjectPDF !== null) &&
                  <ProjectPDF 
                    ProjectPDFLink={getStrapiMedia(projectData.SubProjectPDF.ProjectPDFLink)}
                    ProjectPDFCaption={projectData.SubProjectPDF.ProjectCaption}
                  />
                }
                {
                  /**
                   * SUB PROJECT CODE
                   */
                  (projectData.SubProjectCode !== null) &&
                  <ProjectCode 
                    ProjectCodeLink={projectData.SubProjectCode.ProjectCodeLink}
                    ProjectCodeCaption={projectData.SubProjectCode.ProjectCaption}
                  />
                }
                {
                  /**
                   * SUB PROJECT VIDEO
                   */
                  (projectData.SubProjectVideo !== null) &&
                  <ProjectVideo 
                    ProjectVideoLink={projectData.SubProjectVideo.ProjectVideoLink}
                    ProjectVideoCaption={projectData.SubProjectVideo.ProjectCaption}
                  />
                }
              </div>
            </div>
            <ShareContainer className='d-none d-lg-flex'/>
          </div>
         <OtherProjects heading='Other Projects' className='desktop' projectData={randomThreeProjects}/>
        </Container>
        <OtherProjects heading='Other Projects' className='mobile container mt-3' projectData={randomThreeProjects}/>
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
    populate: [
      "*", 
      "SeoData.ShareImage", 
      "ProjectThumbnail",
      "ProjectImages", 
      "ProjectPDFLink", 
      "SubProjectCarousel.ProjectImages", 
      "SubProject3D",
      "SubProjectPDF.ProjectPDFLink", 
      "SubProjectVideo", 
      "SubProjectCode", 
      "student.major",
      "student.award",
      "level", 
      "major", 
      "school", 
      "award",
      "award.CompanyLogo"
    ]
  };
  
  const randomThreeProjectsQuery = {
    populate: [
      "*",
      "ProjectThumbnail",
      "student.award",
      "school",
      "major",
      "level",
      "award"
    ]
  }
  
  const [projectsRes, randomThreeProjectsRes] = await Promise.all([
    fetchAPI("/projects", projectQuery),
    fetchAPI("/projects", randomThreeProjectsQuery)
  ]);

  return {
    props: { 
      project: projectsRes.data[0],
      randomThreeProjects: randomThreeProjectsRes.data.sort(() => 0.5 - Math.random()).slice(0, 3)
    },
    revalidate: 1,
  }
};

export default ProjectPage;