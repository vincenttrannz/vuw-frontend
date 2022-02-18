import React from "react";
import Link from 'next/link'
import { Projects } from "../../compilers/type";
import { getStrapiMedia } from "../../lib/fetchData";

type ProjectsProps = {
  projects: Projects;
};

export default function AllProjects({ projects }: ProjectsProps) {
  return (
    <div className="projectContainer__portfolios-wrapper">
      {projects.map((project:any) => {
        const ProjectThumbnail = getStrapiMedia(
          project.attributes.ProjectThumbnail
        );
        const ProjectTitle = project.attributes.ProjectTitle;
        const ProjectSlug = project.attributes.Slug;
        return (
          <div className="projectContainer__portfolio" key={project.id}>
            <Link href={`/project/${ProjectSlug}`}>
              <a>
                <div className="image-container">
                  <img src={ProjectThumbnail} alt="project thumbanil" />
                </div>
                <div className="details-container">
                  <h5>{ProjectTitle}</h5>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
