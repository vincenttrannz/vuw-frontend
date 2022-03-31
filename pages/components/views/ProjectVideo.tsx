import React from "react";
import { Project } from "../../../compilers/type";
import ImgCaption from "../views/ImgCaption";

type ProjectDataProps = {
  ProjectVideoLink: string;
  ProjectVideoCaption?: string;
};

export default function ProjectVideo({ ProjectVideoLink, ProjectVideoCaption }: ProjectDataProps) {
  return (
    <div className="iframe-container mt-2 mb-4">
      <iframe
        className="video-iframe"
        src={`https://player.vimeo.com/video/${ProjectVideoLink.substring(8).split("/")[1]}`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
      {
        (ProjectVideoCaption !== undefined) &&
        <ImgCaption className="mx-0 my-1" caption={ProjectVideoCaption} />
      }
    </div>
  );
}
