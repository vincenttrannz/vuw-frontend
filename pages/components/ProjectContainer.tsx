import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import AllProjects from "./AllProjects";
import { Container, Button, Accordion, InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import TextDivider from "./views/TextDivider";
import { getStrapiMedia, getStrapiData } from "../../lib/fetchData";
import { Projects, Project, Schools, Levels, Awards } from "../../compilers/type";
import getFilterList from '../functions/getFilterList';

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
  // console.log("Projects data:", projects);
  // console.log("School data", schoolData);
  // console.log("Level data:", levelData);
  // console.log("Award data:", awardData);

  let FilterArray = new Array;
  let FilterProjects = new Array;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedProjects, setPaginatedProjects] =
    useState<Projects>(projects);
  const NextBtn = useRef<HTMLButtonElement>(null);
  const PrevBtn = useRef<HTMLButtonElement>(null);
  const ProjectContainerDiv = useRef<HTMLDivElement>(null);
  const ProjectYearCollection = Array.from(
    new Set(
      projects.map((project) =>
        new Date(project.attributes.ProjectDate).getFullYear().toString()
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
    new Set (awardData.map((award) => award.attributes.AwardType))
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

  const getSchoolFilterList = (isDesktop: boolean) => {
    return (
      <div id="school-filter" className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
        {SchoolCollection.map((name: string, i: number) => {
          return (
            <div
              key={i}
              onClick={handleFilterClick}
              className={`p2 bold categories-container__category`}
              data-filter={name.replace(/ /g, "_")}
              data-is-school={true}
            >
              {name}
            </div>
          );
        })}
      </div>
    )
  }

  const getMajorFilterList = (isDesktop: boolean) => {
    return (
      <div id="major-filter" className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
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
                <div
                  key={i}
                  onClick={handleFilterClick}
                  className={`p2 bold categories-container__category`}
                  data-filter={major.major.replace(/ /g, "_")}
                  data-school={major.school.replace(/ /g, "_")}
                >
                  {major.major}
                </div>
              );
            })
        )}
      </div>
    )
  }

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

  const handleFilterClick = (event: MouseEvent<HTMLDivElement>) => {
    const SelectedFilter = event.currentTarget.getAttribute("data-filter");
    const AllCategoriesChoice: HTMLAnchorElement[] = Array.from(document.querySelectorAll(".categories-container__category"));
    const ProjectMajorLink: HTMLAnchorElement[] = Array.from(document.querySelectorAll("[data-school]"));
    let PreFilterArray:any[] = new Array;

    // Handling the active state for the filter button that user has selected
    if(event.currentTarget.className.includes("active")){
      event.currentTarget.classList.remove("active");
    } else {
      AllCategoriesChoice.forEach(category => {
        const CategoryContainerId = category.parentElement?.id;
        if(CategoryContainerId == event.currentTarget.parentElement?.id){
          category.classList.remove("active");
        }
        if(event.currentTarget.parentElement?.id == "school-filter" && category.parentElement?.id == "major-filter"){
          category.classList.remove("active");
        }
      })
      event.currentTarget.classList.toggle("active");
    }

    // Handling the disable of the Major filter when clicked on School filter
    ProjectMajorLink.forEach(elem => {
      if(SelectedFilter !== elem.getAttribute("data-school") && event.currentTarget.getAttribute("data-is-school")) {
        elem.classList.toggle("disable");
      } else {
        if(
          event.currentTarget.parentElement?.id == "major-filter" ||
          event.currentTarget.parentElement?.id == "year-filter" ||
          event.currentTarget.parentElement?.id == "level-filter" ||
          event.currentTarget.parentElement?.id == "award-filter"
        ){
          return
        } else {
          elem.classList.remove("disable");
        }
      }
    })

    // Setup filter array that user has selected
    AllCategoriesChoice.forEach(category => {
      if(category.className.includes("active")){
        PreFilterArray.push(
          ((category.getAttribute("data-filter") == "Excellence_Award") || (category.getAttribute("data-filter")) == "Industry_Award") ?
          category.getAttribute("data-filter") :
          category.getAttribute("data-filter")?.toString().replace(/_/g, " ")
        )
        FilterArray = Array.from(new Set(PreFilterArray));
      } else {
        FilterArray = PreFilterArray.filter((currentFilter: string) => currentFilter !== category.getAttribute("data-filter")?.toString().replace(/_/g, " "))
      }
    })
    // console.log("Filter keys are:", FilterArray);

    // Filtering logic
    FilterProjects = projects.filter((project: Project, index: number) => {
      const ProjectSchool = project.attributes.school.data.attributes.SchoolName;
      const ProjectMajor = project.attributes.major.data.attributes.MajorName;
      const ProjectYear = new Date(project.attributes.ProjectDate).getFullYear().toString();
      const ProjectLevel = project.attributes.level.data?.attributes.StudyLevel;
      const ProjectAward = project.attributes.award.data?.attributes.AwardType;
      const ProjectStudentAward = project.attributes.student.data?.attributes?.award.data?.attributes.AwardType;
      // Step by Step logic
      const ProjectFilterArrayElment = [ProjectSchool, ProjectMajor, ProjectYear, ProjectLevel, ProjectAward, ProjectStudentAward].filter(element => {
        return element !== undefined;
      });
      // console.log(`Project ${index}`, ProjectFilterArrayElment);
      if(FilterArray.every(el => ProjectFilterArrayElment.includes(el))) {
        // console.log(project);
        return project;
      }
    })
    setPaginatedProjects(FilterProjects);
  }

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    FilterProjects = projects.filter((project: Project) => {
      const ProjectTags = project.attributes.ProjectTags;
      if(ProjectTags?.includes(searchTerm) && project !== undefined){
        console.log(project);
        return project;
      }
      if(searchTerm == "") {
        console.log(project);
        return project;
      }
    })
    setPaginatedProjects(FilterProjects);
  }

// FilterProjects = projects.filter((project: Project, index: number) => {
//   const ProjectFilterObject:any = {
//     filterArray: [],
//     searchArray: []
//   };
//   const ProjectSchool = project.attributes.school.data.attributes.SchoolName;
//   const ProjectMajor = project.attributes.major.data.attributes.MajorName;
//   const ProjectYear = new Date(project.attributes.ProjectDate).getFullYear().toString();
//   const ProjectLevel = project.attributes.level.data?.attributes.StudyLevel;
//   const ProjectAward = project.attributes.award.data?.attributes.AwardType;
//   const ProjectStudentAward = project.attributes.student.data?.attributes?.award.data?.attributes.AwardType;
//   const ProjectTags:any = (project.attributes.ProjectTags !== null) ? project.attributes.ProjectTags.toLowerCase().split(",") : "";
//   FilterArray = FilterArray.filter(element => {return element !== undefined});
//   FilterArray = FilterArray.filter(element => {return element !== ''});
  
//   // Step by Step logic
//   let ProjectFilterArrayElement = [ProjectSchool, ProjectMajor, ProjectYear, ProjectLevel, ProjectAward, ProjectStudentAward].filter(element => {
//     return element !== undefined;
//   });
//   ProjectFilterArrayElement = ProjectFilterArrayElement.filter(el => el !== "");
//   ProjectFilterObject.filterArray = ProjectFilterArrayElement;
//   ProjectFilterObject.searchArray = ProjectTags;
//   console.log("Project Search Object:", ProjectFilterObject);
  
//   // Filtering
//   if(FilterArray.every(el => ProjectFilterObject.filterArray.includes(el))) {
//     // console.log(project);
//     return project;
//   }
//   // Searching
//   if(ProjectFilterObject.searchArray.toString().includes(searchTerm)){
//     // console.log(project);
//     return project;
//   }
// })
// setPaginatedProjects(FilterProjects);

  return (
    <Container ref={ProjectContainerDiv} className="projectContainer">
      {/* PROJECT DETAILS WRAPPER */}
      <div className="projectContainer__details-wrapper">
        <div className="bg-white rounded">
          <InputGroup>
            <FormControl
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-field"
              className="border-0 bg-white py-0"
              onChange={handleSearch}
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
        {/* Categories wrapper - Display block style only on tablet and above */}
        <div className="projectContainer__categories-desktop">
          <div className="categories-wrapper">
            <h6>School</h6>
            <TextDivider prime={false} />
            {getSchoolFilterList(true)}
          </div>
          <div className="categories-wrapper">
            <h6>Major</h6>
            <TextDivider prime={false} />
            {getMajorFilterList(true)}
          </div>
          <div className="categories-wrapper">
            <h6>Year</h6>
            <TextDivider prime={false} />
            {getFilterList(true, ProjectYearCollection, "year-filter", handleFilterClick)}
          </div>
          <div className="categories-wrapper">
            <h6>Level</h6>
            <TextDivider prime={false} />
            {getFilterList(true, LevelCollection, "level-filter", handleFilterClick)}
          </div>
          <div className="categories-wrapper">
            <h6>Awards</h6>
            <TextDivider prime={false} />
            {getFilterList(true, AwardCollection, "award-filter", handleFilterClick)}
          </div>
        </div>
        {/* Categories wrapper - Display accordion style on mobile */}
        <div className="projectContainer__categories-mobile">
          <Accordion className="categories-wrapper" defaultActiveKey={['0']} alwaysOpen>
            {/* SCHOOL */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h6 className="m-0">School</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getSchoolFilterList(false)}
              </Accordion.Body>
            </Accordion.Item>
            {/* MAJOR */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h6 className="m-0">Major</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getMajorFilterList(false)}
              </Accordion.Body>
            </Accordion.Item>
            {/* YEAR */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h6 className="m-0">Year</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, ProjectYearCollection, "year-filter", handleFilterClick)}
              </Accordion.Body>
            </Accordion.Item>
            {/* LEVEL */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h6 className="m-0">Level</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, LevelCollection, "level-filter", handleFilterClick)}
              </Accordion.Body>
            </Accordion.Item>
            {/* AWARDS */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <h6 className="m-0">Awards</h6>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, AwardCollection, "award-filter", handleFilterClick)}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
