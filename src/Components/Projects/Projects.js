import React, { useContext } from "react";
import Projectsform from "./Projectsform";
import {
  useGetProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./projectsAPI";
import "./projects.css";
import { useState } from "react";
import { mutate } from "swr";
import LinkButton from "../common/LinkButton";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { ToastAlerts } from "../Main/Notifications";

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
  const { isAuthenticated } = useContext(AuthContext);
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetProjects();
  let { url } = useRouteMatch();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error</span>;
  }

  function toggleCreateForm() {
    setdisplayForm((old) => ({ ...old, createForm: !displayForm.createForm }));
  }

  function toggleEditForm(keepOpened = true) {
    if (displayForm.editForm & keepOpened) return;
    setdisplayForm((old) => ({ ...old, editForm: !displayForm.editForm }));
  }

  async function handleDelete(id) {
    let data = await deleteProject(id);
    ToastAlerts(data);
    mutate("projectData");
  }

  async function handleAdd(formValues) {
    let data = await addProject(formValues);
    ToastAlerts(data);
    mutate("projectData");
  }

  async function handleEdit(formValues) {
    let data = await updateProject(formValues);
    ToastAlerts(data);
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
      {isAuthenticated() && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Project
        </button>
      )}

      {isAuthenticated() && displayForm.createForm ? (
        <Projectsform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated() && displayForm.editForm ? (
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
              <div className="project-authors">By: {project.authors}</div>
            </div>
            <div className="cardBtn-container">
              <LinkButton
                to={`${url}/${project._id}`}
                className="viewBtn cardBtn"
              >
                View Details
              </LinkButton>
              {isAuthenticated() && (
                <div className="adminBtn-container">
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
          </div>
        ))}
      </div>
    </div>
  );
}
