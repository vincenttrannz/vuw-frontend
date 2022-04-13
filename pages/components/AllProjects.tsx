import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Projects, Project } from "../../compilers/type";
import TextDivider from './views/TextDivider';
import AwardRibbon from '../../public/award-ribbon.svg';
import { getStrapiMedia } from "../../lib/fetchData";

type ProjectsProps = {
  projects: Projects;
};


export default function AllProjects({ projects }: ProjectsProps) {
  const CategorySplit = (category:string) => {
    return (
      <div className="category-block">
        <span className="tags">{category}</span>
      </div>
    )
  }
  return (
    <>
      {projects.map((project:Project, i:number) => {
        // console.log("Each project:", project);
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
        const ProjectStudentAward = project.attributes.student.data.attributes?.award.data?.attributes.AwardType;
        const ProjectAward = project.attributes.award.data?.attributes?.AwardType;
        
        return (
          <Link key={i} href={`/project/${ProjectSlug}`}>
            <a className="projectContainer__portfolio shadow-sm">
              <div className="thumbnail-container">
                <Image 
                  src={ProjectThumbnail} 
                  priority={true} 
                  layout="fill"
                  alt="project thumbnail"/>
                <div className="img-overlay">
                  <div className="img-overlay__textbox">
                    <span className="p2">Explore</span>
                  </div>
                </div>
              </div>
              <div className="details-container">
                {
                  (ProjectAward !== undefined || ProjectStudentAward !== undefined) &&
                  <div className="details-container__award-ribbon">
                    <AwardRibbon/>
                  </div>
                }
                <div className="details-container__title-name">
                  <h4 className="h6">{ProjectTitle}</h4>
                  <TextDivider prime={false}/>
                    {
                      (ProjectStudent && ProjectStudent.split(" ").length > 2) 
                      ?
                      <p>
                        By&nbsp;
                        {
                          ProjectStudent.split(" ").filter((el, i) => {
                            if((i % 2 !== 0)) return el
                          }).join(" ").toString()
                        }
                      </p>
                      :
                      <p>By {ProjectStudent}</p>
                    }
                  <p className="p2">{ProjectMajor} - {ProjectMajorTeReo}</p>
                </div>
                <div className="details-container__categories">
                  <div className="p2 details-container__multiple">
                    {ProjectSchool !== undefined  && CategorySplit(ProjectSchool)}
                    {ProjectLevel !== undefined  && CategorySplit(ProjectLevel)}
                    {ProjectYear !== undefined  && CategorySplit(ProjectYear)}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
}
