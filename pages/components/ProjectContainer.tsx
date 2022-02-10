import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import {Container} from 'react-bootstrap';

const ProjectContainer: React.FC<any> = ({projects}) => { 
  const projectsData = projects.data;
  return (
    <Container className='projectContainer'>
      <div className='projectContainer__details-wrapper'>
        <h2>Details</h2>
      </div>
      <div className='projectContainer__portfolios-wrapper'>
        {
          projectsData.map((project:any) => {
            // console.log(project);
            const ProjectThumbnail = getStrapiMedia(project.attributes.ProjectThumbnail); 
            const ProjectTitle = project.attributes.ProjectTitle;
            const ProjectSlug = project.attributes.Slug;
            return (
              <div className='projectContainer__portfolio' key={project.id}>
                <Link as={`/project/${ProjectSlug}`} href="/project/[slug]">
                  <a>
                    <div className='image-container'>
                      <img src={ProjectThumbnail} alt="project thumbanil" />
                    </div>
                    <div className='details-container'>
                      <h5>{ProjectTitle}</h5>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })
        }
      </div>
    </Container>
  );
};

export default ProjectContainer;
