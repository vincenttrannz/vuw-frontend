import React from "react";
import { Project } from "../../../compilers/type";

type ProjectDataProps = {
  projectData: Project["attributes"];
};

export default function ProjectCode({ projectData }: ProjectDataProps) {
  return (
    <div>
      <iframe
        height="500"
        width="100%"
        scrolling="no"
        title={projectData.ProjectTitle}
        src={projectData.ProjectCodeLink}
        frameBorder="no"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
}
