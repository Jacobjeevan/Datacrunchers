import React, { useState, useEffect } from "react";
import { getProjectById } from "./projectsAPI";
import { useParams } from "react-router-dom";
import "./ProjectDetail.css";
const ReactMarkdown = require("react-markdown");

export default function ProjectDetail() {
  let { projectid } = useParams();
  const [project, setproject] = useState({});

  useEffect(() => {
    async function getProject() {
      let project = await getProjectById(projectid);
      setproject(project);
    }
    getProject();
  }, [projectid]);

  return (
    <div>
      {project ? (
        <div className="project-meta">
          <div className="project-title-github">
            <div className="project-title-detail">{project.title}</div>
            <a href={project.github} className="project-github-detail">
              Github
            </a>
          </div>

          <ReactMarkdown
            source={project.description}
            className="project-description-detail"
          />
          <div className="project-authors-detail">By: {project.authors}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
