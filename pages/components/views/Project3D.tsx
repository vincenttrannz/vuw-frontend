import React from "react";
import { Project } from "../../../compilers/type";

type ProjectDataProps = {
  projectData: Project["attributes"];
};

export default function Project3D({ projectData }: ProjectDataProps) {
  return (
    <div className="iframe-container">
      <iframe
        title="Student Project"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-trackin="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src={projectData.Project3DLink}
      ></iframe>
    </div>
  );
}
