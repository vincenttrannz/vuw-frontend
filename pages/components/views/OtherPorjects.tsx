import React from "react";
import { Projects } from "../../../compilers/type";
import TextDivider from '../../components/views/TextDivider';
import AllProjects from '../../components/AllProjects';

type OtherProjectProps = {
  projectData: Projects;
  className?: string;
};

export default function OtherPorjects({projectData, className}: OtherProjectProps) {
  return (
    <div className={`other-works-container ${className ? className : ""}`}>
      <div className="textblock-with-divider mb-0 mb-lg-3">
        <h3>Other projects</h3>
        <TextDivider prime />
      </div>
      <AllProjects projects={projectData} />
    </div>
  );
}
