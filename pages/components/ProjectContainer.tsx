import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import AllProjects from './AllProjects';
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Schools } from '../../compilers/type'
import { Container } from 'react-bootstrap';

type ProjectsProps = {
  projects: Projects
  schoolData: Schools
}

const ProjectContainer: React.FC<ProjectsProps> = ({projects, schoolData}) => { 
  console.log("Projects data:", projects);
  console.log("School data", schoolData);

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

  const ProjectYearCollection = Array.from(new Set(projects.map(project => new Date(project.attributes.ProjectDate).getFullYear()))).sort();
  const SchoolCollection = Array.from(schoolData.map(school => school.attributes.SchoolName));
  // const EachSchoolMajor = Array.from()
  const EachSchoolMajor = Array.from(
    schoolData.map(data => {
      const SchoolName = data.attributes.SchoolName;
      let SchoolMajors:any = []; 
      data.attributes.majors.data.forEach(major => {
        SchoolMajors.push(major.attributes.MajorName);
      });
      return SchoolMajors
    })
  )
  console.log(EachSchoolMajor);
  return (
    <Container className='projectContainer'>
      <div className='projectContainer__details-wrapper'>
        <h2>Details</h2>
        <h4>School</h4>
        <ul>
          {
            SchoolCollection.map((name, i) =>  {
              return (
                <li key={i}>
                  <a data-filter={name} href="#">{name.replace("_", " ")}</a>
                </li>
              )
            })
          }
        </ul>
        <h4>Major</h4>
        
        <h4>Year</h4>
        <ul>
          {
            ProjectYearCollection.map((year, i) =>  {
              return (
                <li key={i}>
                  <a href="#">{year}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
      <AllProjects projects={projects}/>
    </Container>
  );
};

export default ProjectContainer;
