import React, { useState, useRef, forwardRef } from "react";
import AllProjects from "./AllProjects";
import { InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import TextDivider from './TextDivider';
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Schools, Levels } from "../../compilers/type";
import { Container } from "react-bootstrap";

type ProjectsProps = {
  projects: Projects;
  schoolData: Schools;
  levelData: Levels;
};

const ProjectContainer: React.FC<ProjectsProps> = ({
  projects,
  schoolData,
  levelData,
}) => {
  console.log("Projects data:", projects);
  console.log("School data", schoolData);
  console.log("Level data:", levelData);

  const ProjectCard = useRef<any>(null);

  const options = {
    categories: ["CourseName"],
    postsPerPage: 12,
    activeClass: "active",
  };

  const [DefaultState, SetDefaultState] = useState({
    listOfPosts: null,
    currentPageId: 1,
    chosen: null,
    categories: null,
  });

  const ProjectYearCollection = Array.from(
    new Set(
      projects.map((project) =>
        new Date(project.attributes.ProjectDate).getFullYear()
      )
    )
  ).sort();
  const SchoolCollection = Array.from(
    schoolData.map((school) => school.attributes.SchoolName)
  );
  const LevelCollection = Array.from(
    levelData.map((level) => level.attributes.StudyLevel)
  );
  const EachSchoolMajor = Array.from(
    schoolData.map((data) => {
      const SchoolName = data.attributes.SchoolName;
      let SchoolMajors: any = [];
      data.attributes.majors.data.forEach((major) => {
        SchoolMajors.push({
          school: SchoolName,
          major: major.attributes.MajorName,
        });
      });
      return SchoolMajors;
    })
  );
  return (
    <Container className="projectContainer">
      <div className="projectContainer__details-wrapper">
        <div className="bg-white rounded">
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-field"
              className="border-0 bg-white py-0"
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
              >
                <SearchLogo/>
              </button>
            </div>
          </InputGroup>
        </div>
        <div className="categories-wrapper">
          <h6>School</h6>
          <TextDivider prime={false}/>
          <ul className="categories-container">
            {SchoolCollection.map((name: string, i: number) => {
              return (
                <li className="categories-container__category" key={i}>
                  <a className="p2 bold" data-filter={name.replace(/ /g, "_")} href="#">
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Major</h6>
          <TextDivider prime={false}/>
          <ul className="categories-container">
            {EachSchoolMajor.map(
              (
                majors: [
                  {
                    school: string;
                    major: string;
                  }
                ]
              ) =>
                majors.map((major, i: number) => {
                  return (
                    <li className="categories-container__category" key={i}>
                      <a className="p2 bold" data-filter={major.major.replace(/ /g, "_")} data-school={major.school.replace(/ /g, "_")} href="#">
                        {major.major}
                      </a>
                    </li>
                  );
                })
            )}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Year</h6>
          <TextDivider prime={false}/>
          <ul className="categories-container">
            {ProjectYearCollection.map((year:number, i:number) => {
              return (
                <li className="categories-container__category" key={i}>
                  <a className="p2 bold" data-filter={year} href="#">{year}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Level</h6>
          <TextDivider prime={false}/>
          <ul className="categories-container">
            {LevelCollection.map((level:string, i:number) => {
              return (
                <li className="categories-container__category" key={i}>
                  <a className="p2 bold" data-filter={level.replace(/ /g, "_")} href="#">{level}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <AllProjects projects={projects}/>
    </Container>
  );
};

export default ProjectContainer;
