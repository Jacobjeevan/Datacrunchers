import React, { useContext } from "react";
import Officersform from "./private/Officersform";
import {
  useGetOfficers,
  addOfficer,
  deleteOfficer,
  updateOfficer,
} from "../../api/officers";
import "../../css/officers.css";
import { useState } from "react";
import { mutate } from "swr";
import { AuthContext } from "../common/Auth";

const defaultFormValues = {
  name: "",
  title: "",
  description: "",
  email: "",
  imageName: "",
};

const defaultFormDisplay = {
  createForm: false,
  editForm: false,
};

export default function Officers() {
  const { isAuthenticated } = useContext(AuthContext);
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetOfficers();

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
    await deleteOfficer(id);
    mutate("officerData");
  }

  async function handleAdd(formValues) {
    var formBody = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      if (key !== "imageName") {
        formBody.append(key, value);
      } else {
        formBody.append("imageName", formValues.imageName[0]);
      }
    }
    await addOfficer(formBody);
    mutate("officerData");
  }

  async function handleEdit(formValues) {
    await updateOfficer(formValues);
    mutate("officerData");
    toggleEditForm(false);
  }

  function handleEditButton(officer) {
    setformValues({
      id: officer._id,
      name: officer.name,
      title: officer.title,
      description: officer.description,
      email: officer.email,
      imageName: officer.imageName,
    });
    toggleEditForm();
  }

  return (
    <div>
      {isAuthenticated() && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Officer
        </button>
      )}

      {isAuthenticated() && displayForm.createForm ? (
        <Officersform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated() && displayForm.editForm ? (
        <Officersform
          toggle={toggleEditForm.bind(null, false)}
          onSubmit={handleEdit}
          initialFormValues={formValues}
        />
      ) : null}

      <div className="officer-container">
        {data.map((officer) => (
          <div key={officer._id} className="officer">
            <div className="officer-meta">
              <img
                src={officer.imageDest}
                alt={officer.name}
                className="officer-headshot"
              />
              <div className="officer-name">{officer.name}</div>
              <div className="officer-title">Position: {officer.title}</div>
              <div className="officer-description">
                About: {officer.description}
              </div>
              <div className="officer-email">Contact: {officer.email}</div>
            </div>
            {isAuthenticated() && (
              <div className="cardBtn-container">
                <button
                  className="editBtn cardBtn"
                  onClick={handleEditButton.bind(this, officer)}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete.bind(this, officer._id)}
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
