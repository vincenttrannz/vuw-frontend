import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects } from '../../compilers/type'
import {Container} from 'react-bootstrap';

type ProjectsProps = {
  projects: Projects
}

const ProjectContainer: React.FC<ProjectsProps> = ({projects}) => { 
  console.log("Projects data:", projects);
  const options = {
    categories: [
      'CourseName'
    ],
    postsPerPage: 12,
    activeClass: 'active'
  };

  const [DefaultState, SetDefaultState] = useState({
    listOfPosts: null,
    currentPageId: 1,
    chosen: null,
    categories: null
  });

  useEffect(() => {
    let chosenPreset = [];
    for(let i = 0; i < options.categories.length; i++) {
			chosenPreset.push('all');
		};
    SetDefaultState({
      listOfPosts: posts,
			chosen: chosenPreset,
			categories: options.categories
    })
  }, [])

  const ProjectCoursesName = Array.from(new Set(projects.map(project => project.attributes.CourseName)));
  return (
    <Container className='projectContainer'>
      <div className='projectContainer__details-wrapper'>
        <h2>Details</h2>
        <div>
          {
            ProjectCoursesName.map((name, i) =>  {
              return (
                <li key={i}>
                  <a href="#">{name}</a>
                </li>
              )
            })
          }
        </div>
      </div>
      <div className='projectContainer__portfolios-wrapper'>
        {
          projects.map((project:any) => {
            const ProjectThumbnail = getStrapiMedia(project.attributes.ProjectThumbnail); 
            const ProjectTitle = project.attributes.ProjectTitle;
            const ProjectSlug = project.attributes.Slug;
            return (
              <div className='projectContainer__portfolio' key={project.id}>
                <Link href={`/project/${ProjectSlug}`}>
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
