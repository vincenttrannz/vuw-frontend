import React, { useState, useEffect, useRef, MouseEvent } from "react";
import AllProjects from "./AllProjects";
import { InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import TextDivider from './TextDivider';
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Schools, Levels } from "../../compilers/type";
import { Container, Button } from "react-bootstrap";

type ProjectsProps = {
  projects: Projects;
  schoolData: Schools;
  levelData: Levels;
  currentPage?: number
};

const ProjectContainer: React.FC<ProjectsProps> = ({
  projects,
  schoolData,
  levelData,
  currentPage
}) => {
  console.log("Projects data:", projects);
  console.log("School data", schoolData);
  console.log("Level data:", levelData);

  

  const [paginatedMedia, setPaginatedMedia] = useState<Projects>();
  const ProjectSchoolLink = useRef<HTMLAnchorElement>(null);
  const ProjectMajorLink = useRef<HTMLAnchorElement>(null);
  const ProjectMajorLinkList = useRef<HTMLUListElement>(null);
  const ProjectSchoolLinkList = useRef<HTMLUListElement>(null);
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

  const getPageCount = () => {
    if (projects && projects.length) {
      return Math.ceil(projects.length / 6);
    }
    return 1;
  };

  const handleSchoolMajorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const SelectedSchoolFilter = event.currentTarget.getAttribute("data-filter");
    const ProjectMajorLinkContainer = (ProjectMajorLinkList.current) && Array.from(ProjectMajorLinkList.current?.children);
    if(ProjectMajorLinkContainer){
      ProjectMajorLinkContainer.forEach((element:HTMLLIElement | any) => {
        const ProjectMajorLink:HTMLAnchorElement | any = Array.from(element?.children)[0];
        if(SelectedSchoolFilter !== ProjectMajorLink.getAttribute("data-school") && event.currentTarget.getAttribute("data-is-school")) {
          ProjectMajorLink.parentNode.classList.toggle("disable");
        } else {
          ProjectMajorLink.parentNode.classList.remove("disable");
        }
      });
    }
  }

  return (
    <Container className="projectContainer">
      {/* PROJECT DETAILS WRAPPER */}
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
          <ul ref={ProjectSchoolLinkList} className="categories-container">
            {SchoolCollection.map((name: string, i: number) => {
              return (
                <li className="categories-container__category" key={i}>
                  <a onClick={handleSchoolMajorClick} type="button" className="p2 bold" ref={ProjectSchoolLink} data-filter={name.replace(/ /g, "_")} data-is-school={true}>
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
          <ul ref={ProjectMajorLinkList} className="categories-container">
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
                      <a onClick={handleSchoolMajorClick} type="button" className="p2 bold" ref={ProjectMajorLink} data-filter={major.major.replace(/ /g, "_")} data-school={major.school.replace(/ /g, "_")}>
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
                  <a type="button" className="p2 bold" data-filter={year}>{year}</a>
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
                  <a type="button" className="p2 bold" data-filter={level.replace(/ /g, "_")}>{level}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* PROJECT PORTFOLIOS WRAPPER */}
      <div className="projectContainer__portfolios-wrapper">
        <AllProjects projects={projects}/>
        <div className="projectContainer__next-prev-container">
          <Button className="prev-btn" variant="vic"><span className="the-arrow rotate"></span> <span className="btn-text">Previous</span></Button>
          <Button className="next-btn" variant="vic"><span className="btn-text">Next</span> <span className="the-arrow"></span></Button>
        </div>
      </div>
    </Container>
  );
};

export default ProjectContainer;
