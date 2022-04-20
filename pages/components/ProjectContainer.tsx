import React, { useState, useEffect, useRef, MouseEvent, ChangeEvent } from "react";
import { useRouter } from 'next/router';
import $ from 'jquery';
import AllProjects from "./AllProjects";
import { Container, Accordion, InputGroup, FormControl } from "react-bootstrap";
import SearchLogo from "../../public/search-logo.svg";
import TextDivider from "./views/TextDivider";
import VicButton from './views/VicButton';
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
  console.log("Projects data:", projects);
  console.log("School data", schoolData);
  console.log("Level data:", levelData);
  console.log("Award data:", awardData);

  let FilterArray = new Array;
  // Collection of set state for the components
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedProjects, setPaginatedProjects] = useState<Projects>(projects);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSelectedFilters, setCurrentSelectedFilters] = useState<string[]>([]);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [disablePrevBtn, setDisablePrevBtn] = useState(false);
  // Collection of reference for button, input
  const SearchField = useRef<HTMLInputElement>(null);
  const ProjectContainerDiv = useRef<HTMLDivElement>(null);
  const HomeURLYearQuery = useRouter().query.year;

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
      <div data-parent-filter="school-filter" id="school-filter" className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
        {SchoolCollection.map((name: string, i: number) => {
          return (
            <div
              key={i}
              tabIndex={0}
              onClick={handleFilter}
              className={`p2 bold categories-container__category`}
              data-responsive={isDesktop ? "desktopFilter" : "mobileFilter"}
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
      <div data-parent-filter="major-filter" id="major-filter" className={`${isDesktop ? "categories-container__desktop" : "categories-container__mobile"}`}>
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
                  tabIndex={0}
                  onClick={handleFilter}
                  className={`p2 bold categories-container__category`}
                  data-responsive={isDesktop ? "desktopFilter" : "mobileFilter"}
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

  const handleFilter = (event: MouseEvent<HTMLDivElement>) => {
    const SelectedFilter = event.currentTarget.getAttribute("data-filter");
    const AllCategoriesChoice: HTMLAnchorElement[] = Array.from(document.querySelectorAll(".categories-container__category"));
    const ProjectMajorLink: HTMLAnchorElement[] = Array.from(document.querySelectorAll("[data-school]"));
    let PreFilterArray:any[] = new Array;

    // Handling the active state for the filter button that user has selected
    if(event.currentTarget.className.includes("active")){
      event.currentTarget.classList.remove("active");
    } else {
      AllCategoriesChoice.forEach(category => {
        const CategoryContainerId = category.parentElement?.getAttribute("data-parent-filter");        
        if(CategoryContainerId == event.currentTarget.parentElement?.getAttribute("data-parent-filter")){
          category.classList.remove("active");
        }
        if(event.currentTarget.parentElement?.getAttribute("data-parent-filter") == "school-filter" && category.parentElement?.getAttribute("data-parent-filter") == "major-filter"){
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
          event.currentTarget.parentElement?.getAttribute("data-parent-filter") == "major-filter" ||
          event.currentTarget.parentElement?.getAttribute("data-parent-filter") == "year-filter" ||
          event.currentTarget.parentElement?.getAttribute("data-parent-filter") == "level-filter" ||
          event.currentTarget.parentElement?.getAttribute("data-parent-filter") == "award-filter"
        ){
          return
        } else {
          elem.classList.remove("disable");
        }
      }
    })

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
    // Filtering logic
    setCurrentSelectedFilters(FilterArray)
  }

  // based on the selected filtes in the sidebar, filter the provided array of projects that have a content match
  const filterOnSelectedFilter = (filterProjects: Projects, selectedFilters: string[]) => {
    return filterProjects.filter((project: Project) => {
      const ProjectSchool = project.attributes.school.data.attributes.SchoolName;
      const ProjectMajor = project.attributes.major.data.attributes.MajorName;
      const ProjectYear = new Date(project.attributes.ProjectDate).getFullYear().toString();
      const ProjectLevel = project.attributes.level.data?.attributes.StudyLevel;
      const ProjectAward = project.attributes.award.data?.attributes.AwardType;
      const ProjectStudentAward = project.attributes.student.data?.attributes?.award.data?.attributes.AwardType;
      // Setting up an array contained all project's filter points
      const ProjectFilterElement = [ProjectSchool, ProjectMajor, ProjectYear, ProjectLevel, ProjectAward, ProjectStudentAward].filter(el => el !== undefined);

      // Step by Step logic
      // console.log(`Project ${index}`, ProjectSearchFilterElement);
      if (selectedFilters.every(el => ProjectFilterElement.includes(el))) {
        return project;
      }
    })
  }

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  }

  const filterOnTextQuery = (projects: Projects, searchTerm: string): Projects => {
    return projects.filter((project: Project) => {
      const ProjectTags = String(project.attributes.ProjectTags).toLowerCase();
      const ProjectTitle = String(project.attributes.ProjectTitle).toLowerCase();
      const ProjectStudent = String(project.attributes.student.data.attributes?.StudentName).toLowerCase();
      // console.log("Search term:", ProjectTags, ProjectTitle, ProjectStudent);

      // IF found any project that contained the search term
      if(
          project !== undefined &&
          ProjectTags?.includes(searchTerm) ||
          ProjectTitle.includes(searchTerm) ||
          ProjectStudent?.includes(searchTerm)
      ){
        // console.log(project);
        return project;
      }
      // IF the search term start by default blank or user backspace all search, return everything
      if(searchTerm == "") {
        // console.log(project);
        return project;
      }
    })
  }

  // Logic for paginated projects
  useEffect(() => {
    if (projects && projects.length) {
      switch (currentPage) {
        case 1:
          setPaginatedProjects(projects.slice(0, 12));
          break;
        case 2:
          setPaginatedProjects(projects.slice(12, 24));
          break;
        default:
          setPaginatedProjects(
            projects.slice(currentPage * 12, currentPage * 12 + 12)
          );
          break;
      }
    }
  }, [currentPage, projects]);

  useEffect(() => {
    // 1. Logic for NextBtn
    paginatedProjects.length < 12
      ? setDisableNextBtn(true)
      : setDisableNextBtn(false);

    // 2. Logic for PrevBtn
    currentPage == 1
      ? setDisablePrevBtn(true)
      : setDisablePrevBtn(false);
  }, [paginatedProjects, currentPage, disableNextBtn, disablePrevBtn]);

  useEffect(() => {
    $(".categories-container__category").each((i, el) => {
      if(window !== undefined && window.innerWidth > 767){
        if($(el).attr("data-filter") == HomeURLYearQuery && $(el).attr("data-responsive") == "desktopFilter"){
          $(el).trigger("click")
        }
      } else if (window !== undefined && window.innerWidth < 767) {
        if($(el).attr("data-filter") == HomeURLYearQuery && $(el).attr("data-responsive") == "mobileFilter"){
          $(el).trigger("click")
        }
      }
    })
  }, [HomeURLYearQuery])

  // Stacking the Filtering and Search with UseEffect hook
  useEffect(() => {
    let preFilteredProjects: Projects = projects;
    preFilteredProjects = filterOnSelectedFilter(preFilteredProjects, currentSelectedFilters)
    preFilteredProjects = filterOnTextQuery(preFilteredProjects, searchQuery)
    setPaginatedProjects(preFilteredProjects.slice(0, 12));
  }, [searchQuery, currentSelectedFilters]);

  return (
    <Container ref={ProjectContainerDiv} className="projectContainer">
      {/* PROJECT DETAILS WRAPPER */}
      <div className="projectContainer__details-wrapper">
        <div className="bg-white rounded">
          <InputGroup>
            <FormControl
              tabIndex={0}
              ref={SearchField}
              placeholder="Search"
              aria-label="search"
              aria-describedby="search-field"
              className="border-0 bg-white py-0"
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <div className="btn btn-link text-primary pe-none">
                <SearchLogo />
              </div>
            </div>
          </InputGroup>
        </div>
        {/* Categories wrapper - Display block style only on tablet and above */}
        <div className="projectContainer__categories-desktop">
          <div className="categories-wrapper">
            <p className="h6">School</p>
            <TextDivider prime={false} />
            {getSchoolFilterList(true)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Major</p>
            <TextDivider prime={false} />
            {getMajorFilterList(true)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Year</p>
            <TextDivider prime={false} />
            {getFilterList(true, ProjectYearCollection, "year-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Level</p>
            <TextDivider prime={false} />
            {getFilterList(true, LevelCollection, "level-filter", handleFilter)}
          </div>
          <div className="categories-wrapper">
            <p className="h6">Awards</p>
            <TextDivider prime={false} />
            {getFilterList(true, AwardCollection, "award-filter", handleFilter)}
          </div>
        </div>
        {/* Categories wrapper - Display accordion style on mobile */}
        <div className="projectContainer__categories-mobile">
          <Accordion className="categories-wrapper" defaultActiveKey={['0']} alwaysOpen>
            {/* SCHOOL */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className="h6 m-0">School</p>
              </Accordion.Header>
              <Accordion.Body>
                {getSchoolFilterList(false)}
              </Accordion.Body>
            </Accordion.Item>
            {/* MAJOR */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <p className="h6 m-0">Major</p>
              </Accordion.Header>
              <Accordion.Body>
                {getMajorFilterList(false)}
              </Accordion.Body>
            </Accordion.Item>
            {/* YEAR */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <p className="h6 m-0">Year</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, ProjectYearCollection, "year-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* LEVEL */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <p className="h6 m-0">Level</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, LevelCollection, "level-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
            {/* AWARDS */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <p className="h6 m-0">Awards</p>
              </Accordion.Header>
              <Accordion.Body>
                {getFilterList(false, AwardCollection, "award-filter", handleFilter)}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* PROJECT PORTFOLIOS WRAPPER */}
      <div className="projectContainer__portfolios-wrapper">
        {
          (paginatedProjects.length > 0)
          ?
          <AllProjects projects={paginatedProjects}/>
          :
          <h2 className="no-result">No results</h2>
        }
        <div className="projectContainer__next-prev-container">
          <VicButton
            ClickFunc={previousPage}
            variant="vic"
            btnType="prev"
            btnText="Previous"
            className="prev-btn"
            disable={disablePrevBtn}
          />
          <VicButton
            ClickFunc={nextPage}
            variant="vic"
            btnType="next"
            btnText="Next"
            className="next-btn"
            disable={disableNextBtn}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProjectContainer;
