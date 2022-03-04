import React, { useState, useEffect, useRef, MouseEvent } from "react";
import AllProjects from "./AllProjects";
import { InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import TextDivider from "./TextDivider";
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Schools, Levels, Awards } from "../../compilers/type";
import { Container, Button } from "react-bootstrap";

type ProjectsProps = {
  projects: Projects;
  schoolData: Schools;
  levelData: Levels;
  awardData: Awards;
};

const ProjectContainer: React.FC<ProjectsProps> = ({
  projects,
  schoolData,
  levelData,
  awardData,
}) => {
  console.log("Projects data:", projects);
  console.log("School data", schoolData);
  console.log("Level data:", levelData);
  console.log("Award data:", awardData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedProjects, setPaginatedProjects] =
    useState<Projects>(projects);
  const NextBtn = useRef<HTMLButtonElement>(null);
  const PrevBtn = useRef<HTMLButtonElement>(null);
  const ProjectContainerDiv = useRef<HTMLDivElement>(null);
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
  const AwardCollection = Array.from(
    awardData.map((award) => award.attributes.AwardName)
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

  // Logic for paginated projects
  useEffect(() => {
    if (projects && projects.length) {
      switch (currentPage) {
        case 1:
          setPaginatedProjects(projects.slice(0, 6));
          break;
        case 2:
          setPaginatedProjects(projects.slice(6, 12));
          break;
        default:
          setPaginatedProjects(
            projects.slice(currentPage * 6, currentPage * 6 + 6)
          );
          break;
      }
    }
  }, [currentPage, projects]);

  // This effect to check after Set new projects length
  useEffect(() => {
    // console.log("Check after set projects", paginatedProjects.length);

    // 1. Logic for NextBtn
    paginatedProjects.length < 6
      ? NextBtn.current?.setAttribute("disabled", "true")
      : NextBtn.current?.removeAttribute("disabled");

    // 2. Logic for NextBtn
    currentPage == 1
      ? PrevBtn.current?.setAttribute("disabled", "true")
      : PrevBtn.current?.removeAttribute("disabled");
  }, [paginatedProjects, currentPage]);

  const scrollToRef = (ref: any) =>
    window.scrollTo(0, ref.current?.offsetTop - 75);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToRef(ProjectContainerDiv);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToRef(ProjectContainerDiv);
  };

  const getPageCount = () => {
    if (projects && projects.length) {
      return Math.ceil(projects.length / 6);
    }
    return 1;
  };

  const handleSchoolMajorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const SelectedSchoolFilter = event.currentTarget.getAttribute("data-filter");
    const ProjectMajorLinkContainer = ProjectMajorLinkList.current && Array.from(ProjectMajorLinkList.current?.children);
    if (ProjectMajorLinkContainer) {
      ProjectMajorLinkContainer.forEach((element: HTMLLIElement | any) => {
        const ProjectMajorLink: HTMLAnchorElement | any = Array.from(
          element?.children
        )[0];
        if (
          SelectedSchoolFilter !==
            ProjectMajorLink.getAttribute("data-school") &&
          event.currentTarget.getAttribute("data-is-school")
        ) {
          ProjectMajorLink.classList.toggle("disable");
        } else {
          ProjectMajorLink.classList.remove("disable");
        }
      });
    }
  };

  return (
    <Container ref={ProjectContainerDiv} className="projectContainer">
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
                <SearchLogo />
              </button>
            </div>
          </InputGroup>
        </div>
        <div className="categories-wrapper">
          <h6>School</h6>
          <TextDivider prime={false} />
          <ul ref={ProjectSchoolLinkList} className="categories-container">
            {SchoolCollection.map((name: string, i: number) => {
              return (
                <li key={i}>
                  <a
                    onClick={handleSchoolMajorClick}
                    type="button"
                    className="p2 bold categories-container__category"
                    ref={ProjectSchoolLink}
                    data-filter={name.replace(/ /g, "_")}
                    data-is-school={true}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Major</h6>
          <TextDivider prime={false} />
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
                    <li key={i}>
                      <a
                        onClick={handleSchoolMajorClick}
                        type="button"
                        className="p2 bold categories-container__category"
                        ref={ProjectMajorLink}
                        data-filter={major.major.replace(/ /g, "_")}
                        data-school={major.school.replace(/ /g, "_")}
                      >
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
          <TextDivider prime={false} />
          <ul className="categories-container">
            {ProjectYearCollection.map((year: number, i: number) => {
              return (
                <li key={i}>
                  <a type="button" className="p2 bold categories-container__category" data-filter={year}>
                    {year}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Level</h6>
          <TextDivider prime={false} />
          <ul className="categories-container">
            {LevelCollection.map((level: string, i: number) => {
              return (
                <li key={i}>
                  <a
                    type="button"
                    className="p2 bold categories-container__category"
                    data-filter={level.replace(/ /g, "_")}
                  >
                    {level}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="categories-wrapper">
          <h6>Awards</h6>
          <TextDivider prime={false} />
          <ul className="categories-container">
            {AwardCollection.map((award: string, i: number) => {
              return (
                <li key={i}>
                  <a 
                    type="button"
                    className="p2 bold categories-container__category"
                    data-filter={award.replace(/ /g, "_")}
                  >
                    {award}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {/* PROJECT PORTFOLIOS WRAPPER */}
      <div className="projectContainer__portfolios-wrapper">
        <AllProjects projects={paginatedProjects} />
        <div className="projectContainer__next-prev-container">
          <Button
            ref={PrevBtn}
            onClick={previousPage}
            className="prev-btn"
            variant="vic"
          >
            <span className="the-arrow rotate"></span>{" "}
            <span className="btn-text">Previous</span>
          </Button>
          <Button
            ref={NextBtn}
            onClick={nextPage}
            className="next-btn"
            variant="vic"
          >
            <span className="btn-text">Next</span>{" "}
            <span className="the-arrow"></span>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProjectContainer;
