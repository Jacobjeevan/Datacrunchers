import React from "react";
import { useQuery } from "react-query";
import fetchProjects from "../../api/projects";
import "../../css/projects.css";
import Container from "react-bootstrap/Container";

export default function Projects() {
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
    <Container>
      <div className="project-container">
        {data.map((project) => (
          <div key={project.id} className="project">
            <div className="title">{project.title}</div>
            <div className="description">{project.description}</div>
            <div className="authors">{project.authors}</div>
            <div className="github">{project.github}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}
