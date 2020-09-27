import React, { useState, useEffect } from "react";
import { getProjectById } from "../../../api/projects";
import { useParams } from "react-router-dom";

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
          <div className="project-description">{project.description}</div>
          <div className="project-authors">{project.authors}</div>
          <div className="project-github">{project.github}</div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
