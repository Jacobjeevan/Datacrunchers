import React from "react";
import { useQuery } from "react-query";
import Projectsform from "./private/Projectsform";
import { fetchProjects } from "../../api/projects";
import "../../css/projects.css";

export default function ProjectContainer(props) {
  const { isLoading, isError, data, error } = useQuery(
    "projectData",
    fetchProjects
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {props.formDisplay ? <Projectsform toggle={props.toggleForm} /> : null}

      <div className="project-container">
        {data.map((project) => (
          <div key={project._id} className="project">
            <div className="title">{project.title}</div>
            <div className="description">{project.description}</div>
            <div className="authors">{project.authors}</div>
            <div className="github">{project.github}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
