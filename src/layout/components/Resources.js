import React from "react";
import Resourcesform from "./private/Resourcesform";
import {
  useGetResources,
  addResource,
  deleteResource,
  updateResource,
} from "../../api/resources";
import "../../css/resources.css";
import { useState } from "react";
import { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const defaultFormValues = {
  title: "",
  description: "",
};

const defaultFormDisplay = {
  createForm: false,
  editForm: false,
};

export default function Resources() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetResources();
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
    await deleteResource(id, token);
    mutate("resourceData");
  }

  async function handleAdd(formValues) {
    await addResource(formValues, token);
    mutate("resourceData");
  }

  async function handleEdit(formValues) {
    await updateResource(formValues, token);
    mutate("resourceData");
    toggleEditForm(false);
  }

  function handleEditButton(resource) {
    setformValues({
      id: resource._id,
      title: resource.title,
      description: resource.description,
    });
    toggleEditForm();
  }

  return (
    <div>
      {isAuthenticated && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Resource
        </button>
      )}

      {isAuthenticated && displayForm.createForm ? (
        <Resourcesform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated && displayForm.editForm ? (
        <Resourcesform
          toggle={toggleEditForm.bind(null, false)}
          onSubmit={handleEdit}
          initialFormValues={formValues}
        />
      ) : null}

      <div className="resource-container">
        {data.map((resource) => (
          <div key={resource._id} className="resource">
            <div className="resource-meta">
              <div className="resource-title">{resource.title}</div>
              <div className="resource-description">{resource.description}</div>
            </div>
            {isAuthenticated && (
              <div className="cardBtn-container">
                <button
                  className="editBtn cardBtn"
                  onClick={handleEditButton.bind(this, resource)}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete.bind(this, resource._id)}
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
