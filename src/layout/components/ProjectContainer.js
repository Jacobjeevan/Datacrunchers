import React from "react";
import Projectsform from "./private/Projectsform";
import {
  useGetProjects,
  useDeleteProject,
  useAddProject,
} from "../../api/projects";
import "../../css/projects.css";
import Button from "react-bootstrap/Button";

export default function ProjectContainer(props) {
  const { isLoading, isError, data, error } = useGetProjects();
  const [addProject] = useAddProject();
  const [deleteProject] = useDeleteProject();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  function handleClick(id) {
    deleteProject(id);
  }

  function submitForm(values) {
    addProject(values);
  }

  return (
    <div>
      {props.formDisplay ? (
        <Projectsform toggle={props.toggleForm} onSubmit={submitForm} />
      ) : null}

      <div className="project-container">
        {data.map((project) => (
          <div key={project._id} className="project">
            <div className="title">{project.title}</div>
            <div className="description">{project.description}</div>
            <div className="authors">{project.authors}</div>
            <div className="github">{project.github}</div>
            <Button
              variant="danger"
              type="button"
              onClick={handleClick.bind(this, project._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
