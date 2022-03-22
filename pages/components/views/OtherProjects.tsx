import React from "react";
import { Projects } from "../../../compilers/type";
import TextDivider from './TextDivider';
import AllProjects from '../AllProjects';

type OtherProjectProps = {
  projectData: Projects;
  className?: string;
  heading: string;
};

export default function OtherPorjects({projectData, className, heading}: OtherProjectProps) {
  return (
    <div className={`other-works-container ${className ? className : ""}`}>
      <div className="textblock-with-divider mb-0 mb-md-3">
        <h3>{heading}</h3>
        <TextDivider prime />
      </div>
      <AllProjects projects={projectData} />
    </div>
  );
}
