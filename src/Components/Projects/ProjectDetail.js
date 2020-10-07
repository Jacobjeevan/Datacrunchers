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
          <div className="project-title">{project.title}</div>
          <ReactMarkdown
            source={project.description}
            className="project-description-detail"
          />
          <div className="project-authors">{project.authors}</div>
          <div className="project-github">{project.github}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
