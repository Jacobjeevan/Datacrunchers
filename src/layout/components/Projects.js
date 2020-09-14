import React from "react";
import Projectsform from "./private/Projectsform";
import {
  useGetProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../../api/projects";
import "../../css/projects.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { mutate } from "swr";

const defaultFormValues = {
  title: "",
  description: "",
  authors: "",
  github: "",
};

const defaultFormDisplay = {
  createForm: false,
  editForm: false,
};

export default function Project() {
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);

  const { isLoading, data, error } = useGetProjects();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  function toggleCreateForm() {
    setdisplayForm((old) => ({ ...old, createForm: !displayForm.createForm }));
  }

  function toggleEditForm(keepOpened = true) {
    if (displayForm.editForm & keepOpened) return;
    setdisplayForm((old) => ({ ...old, editForm: !displayForm.editForm }));
  }

  async function handleDelete(id) {
    await deleteProject(id);
    mutate("projectData");
  }

  async function handleAdd(formValues) {
    await addProject(formValues);
    mutate("projectData");
  }

  async function handleEdit(formValues) {
    await updateProject(formValues);
    mutate("projectData");
    toggleEditForm(false);
  }

  function handleEditButton(project) {
    setformValues({
      id: project._id,
      title: project.title,
      description: project.description,
      authors: project.authors,
      github: project.github,
    });
    toggleEditForm();
  }

  return (
    <div>
      <Button variant="primary" onClick={toggleCreateForm}>
        Add Project
      </Button>{" "}
      {displayForm.createForm ? (
        <Projectsform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {displayForm.editForm ? (
        <Projectsform
          toggle={toggleEditForm}
          onSubmit={handleEdit}
          initialFormValues={formValues}
        />
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
              onClick={handleDelete.bind(this, project._id)}
            >
              Delete
            </Button>
            <Button
              variant="info"
              type="button"
              onClick={handleEditButton.bind(this, project)}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
