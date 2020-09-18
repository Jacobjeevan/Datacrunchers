import React from "react";
import Careersform from "./private/Careersform";
import {
  useGetCareers,
  addCareer,
  deleteCareer,
  updateCareer,
} from "../../api/careers";
import "../../css/careers.css";
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

export default function Careers() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetCareers();
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
    await deleteCareer(id, token);
    mutate("careerData");
  }

  async function handleAdd(formValues) {
    await addCareer(formValues, token);
    mutate("careerData");
  }

  async function handleEdit(formValues) {
    await updateCareer(formValues, token);
    mutate("careerData");
    toggleEditForm(false);
  }

  function handleEditButton(career) {
    setformValues({
      id: career._id,
      title: career.title,
      description: career.description,
    });
    toggleEditForm();
  }

  return (
    <div>
      {isAuthenticated && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Career
        </button>
      )}

      {isAuthenticated && displayForm.createForm ? (
        <Careersform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated && displayForm.editForm ? (
        <Careersform
          toggle={toggleEditForm.bind(null, false)}
          onSubmit={handleEdit}
          initialFormValues={formValues}
        />
      ) : null}

      <div className="career-container">
        {data.map((career) => (
          <div key={career._id} className="career">
            <div className="career-meta">
              <div className="title">{career.title}</div>
              <div className="description">{career.description}</div>
            </div>
            {isAuthenticated && (
              <div className="cardBtn-container">
                <button
                  className="editBtn cardBtn"
                  onClick={handleEditButton.bind(this, career)}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete.bind(this, career._id)}
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
