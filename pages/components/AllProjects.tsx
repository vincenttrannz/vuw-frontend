import React, { useRef, forwardRef } from "react";
import Link from 'next/link'
import { Projects, Project } from "../../compilers/type";
import TextDivider from './TextDivider';
import { getStrapiMedia } from "../../lib/fetchData";

type ProjectsProps = {
  projects: Projects;
  project?: Project;
};


export default function AllProjects({ projects }: ProjectsProps) {
  const CategorySplit = (category:string) => {
    return (
      <div>
        <span>{category}</span><span className="ms-2">|</span>
      </div>
    )
  }
  return (
    <div className="projectContainer__portfolios-wrapper">
      {projects.map((project:Project, i:number) => {
        console.log("Each project:", project);
        const ProjectThumbnail = getStrapiMedia(
          project.attributes.ProjectThumbnail
        );
        const ProjectTitle = project.attributes.ProjectTitle;
        const ProjectSlug = project.attributes.Slug;
        const ProjectStudent = project.attributes.student.data?.attributes?.StudentName;
        const ProjectSchool = project.attributes.school.data?.attributes?.SchoolName;
        const ProjectLevel = project.attributes.level.data?.attributes?.StudyLevel;
        const ProjectYear = new Date(project.attributes.ProjectDate).getFullYear().toString();
        const ProjectMajor = project.attributes.major.data?.attributes?.MajorName;
        const ProjectMajorTeReo = project.attributes.major.data?.attributes?.MajorTeReo;
        return (
          <Link key={i} href={`/project/${ProjectSlug}`}>
            <a className="projectContainer__portfolio shadow-sm" key={project.id}>
              <div className="image-container">
                <img src={ProjectThumbnail} alt="project thumbanil"/>
                <div className="img-overlay">
                  <div className="img-overlay__textbox">
                    <span className="p2">Explore</span>
                  </div>
                </div>
              </div>
              <div className="details-container">
                <div className="details-container__title-name">
                  <h6>{ProjectTitle}</h6>
                  <TextDivider prime={false}/>
                  <p>By {ProjectStudent}</p>
                </div>
                <div className="details-container__categories">
                  <div className="p2 details-container__multiple">
                    {ProjectSchool !== undefined  && CategorySplit(ProjectSchool)}
                    {ProjectLevel !== undefined  && CategorySplit(ProjectLevel)}
                    {ProjectYear !== undefined  && CategorySplit(ProjectYear)}
                  </div>
                  <div className="p2 details-container__major">
                    <span>{ProjectMajor} - {ProjectMajorTeReo}</span>
                  </div>
                  <div className="filter-container d-none">
                    <p data-find-school={ProjectSchool.replace(/ /g, "_")}>{ProjectSchool.replace(/ /g, "_")}</p>
                    <p data-find-major={ProjectMajor.replace(/ /g, "_")}>{ProjectMajor.replace(/ /g, "_")}</p>
                    <p data-find-year={ProjectYear}>{ProjectYear}</p>
                    <p data-find-level={ProjectLevel.replace(/ /g, "_")}>{ProjectLevel.replace(/ /g, "_")}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
