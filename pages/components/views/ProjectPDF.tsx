import React from "react";
import ImgCaption from '../views/ImgCaption';
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

type ProjectDataProps = {
  ProjectPDFLink: string;
  ProjectPDFCaption?: string;
};

export default function ProjectPDF({ ProjectPDFLink, ProjectPDFCaption }: ProjectDataProps) {
  // React-pdf appendancies
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
        <div className="pdf-container mt-2 mb-4">
          <Viewer
            fileUrl={ProjectPDFLink}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={SpecialZoomLevel.PageFit}
          />
          {
            (ProjectPDFCaption !== undefined) &&
            <ImgCaption className="mx-0 my-1" caption={ProjectPDFCaption}/>
          }
        </div>
      </Worker>
    </>
  );
}