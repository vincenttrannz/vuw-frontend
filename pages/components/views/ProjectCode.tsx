import React from "react";
import ImgCaption from '../views/ImgCaption';

type ProjectDataProps = {
  ProjectCodeLink: string;
  ProjectCodeCaption?: string;
};

export default function ProjectCode({ ProjectCodeLink, ProjectCodeCaption }: ProjectDataProps) {
  return (
    <div className="iframe-container mt-2 mb-4">
      <iframe
        // scrolling="no"
        title={ProjectCodeCaption}
        src={ProjectCodeLink}
        frameBorder="no"
        loading="lazy"
        allowFullScreen
      ></iframe>
      {
        (ProjectCodeCaption !== undefined) ?
        <ImgCaption className="mx-0 my-1" caption={ProjectCodeCaption}/> :
        (ProjectCodeCaption !== null) ?
        <span></span> : ""
      }
    </div>
  );
}
