import React from "react";
import Projectsform from "./private/Projectsform";
import {
  useGetProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../../api/projects";
import "../../css/projects.css";
import { useState } from "react";
import { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function Projects() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetProjects();
  let token;

  async function getToken() {
    try {
      console.log(user);
      token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_audience,
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (isAuthenticated) {
    getToken();
  }

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
    await deleteProject(id, token);
    mutate("projectData");
  }

  async function handleAdd(formValues) {
    await addProject(formValues, token);
    mutate("projectData");
  }

  async function handleEdit(formValues) {
    await updateProject(formValues, token);
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
      {isAuthenticated && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Project
        </button>
      )}

      {isAuthenticated && displayForm.createForm ? (
        <Projectsform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated && displayForm.editForm ? (
        <Projectsform
          toggle={toggleEditForm.bind(null, false)}
          onSubmit={handleEdit}
          initialFormValues={formValues}
        />
      ) : null}

      <div className="project-container">
        {data.map((project) => (
          <div key={project._id} className="project">
            <div className="project-meta">
              <div className="project-title">{project.title}</div>
              <div className="project-description">{project.description}</div>
              <div className="project-authors">{project.authors}</div>
              <div className="project-github">{project.github}</div>
            </div>
            {isAuthenticated && (
              <div className="cardBtn-container">
                <button
                  className="editBtn cardBtn"
                  onClick={handleEditButton.bind(this, project)}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete.bind(this, project._id)}
                  className="deleteBtn cardBtn"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
