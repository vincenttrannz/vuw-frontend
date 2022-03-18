import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Project } from "../../../compilers/type";
import { getStrapiMedia } from "../../../lib/fetchData";

type ProjectDataProps = {
  projectData: Project["attributes"];
};

export default function ProjectPDF({ projectData }: ProjectDataProps) {
  // React-pdf appendancies
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const projectPDF = getStrapiMedia(projectData.ProjectPDFLink);
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
        <div
          style={{
            height: "750px",
            width: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Viewer
            fileUrl={projectPDF}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
}
