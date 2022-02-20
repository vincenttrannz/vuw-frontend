import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import AllProjects from './AllProjects';
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Schools, Levels } from '../../compilers/type'
import { Container } from 'react-bootstrap';

type ProjectsProps = {
  projects: Projects;
  schoolData: Schools;
  levelData: Levels
}

const ProjectContainer: React.FC<ProjectsProps> = ({projects, schoolData, levelData}) => { 
  console.log("Projects data:", projects);
  console.log("School data", schoolData);
  console.log("Level data:", levelData);

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
  const LevelCollection = Array.from(levelData.map(level => level.attributes.StudyLevel));
  const EachSchoolMajor = Array.from(
    schoolData.map(data => {
      const SchoolName = data.attributes.SchoolName;
      let SchoolMajors:any = []; 
      data.attributes.majors.data.forEach(major => {
        SchoolMajors.push({
          school: SchoolName,
          major: major.attributes.MajorName
        });
      });
      return SchoolMajors
    })
  );
  return (
    <Container className='projectContainer'>
      <div className='projectContainer__details-wrapper'>
        <h2>Details</h2>
        <h4>School</h4>
        <ul>
          {
            SchoolCollection.map((name:string, i:number) =>  {
              return (
                <li key={i}>
                  <a data-filter={name} href="#">{name.replace("_", " ")}</a>
                </li>
              )
            })
          }
        </ul>
        <h4>Major</h4>
        <ul>
          {
            EachSchoolMajor.map((majors:[{
              school: string;
              major: string;
            }]) => 
              majors.map((major, i:number) => {
                return (
                  <li key={i}>
                    <a data-school={major.school} href="#">{major.major.replace(/_+/g, " ")}</a>
                  </li>
                )
              })
            )
          }
        </ul>
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
        <h4>Level</h4>
        <ul>
          {
            LevelCollection.map((level, i) => {
              return (
                <li key={i}>
                  <a href="#">{level.replace(/_+/g, " ")}</a>
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
