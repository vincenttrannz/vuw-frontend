import React from "react";
import ImgCaption from '../views/ImgCaption';

type Project3DProps = {
  Project3DLink: string;
  Project3DCaption?: string;
};

export default function Project3D({ Project3DLink, Project3DCaption }: Project3DProps) {
  return (
    <div className="iframe-container mt-2 mb-4">
      <iframe
        title="Student Project"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-trackin="true"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
        src={Project3DLink}
      ></iframe>
      {
        (Project3DCaption !== undefined) &&
        <ImgCaption className="mx-0 my-1" caption={Project3DCaption}/>
      }
    </div>
  );
}
