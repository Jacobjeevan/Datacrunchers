import React, { useContext } from "react";
import Officersform from "./Officersform";
import {
  useGetOfficers,
  addOfficer,
  deleteOfficer,
  updateOfficer,
} from "./officersAPI";
import "./officers.css";
import { useState } from "react";
import { mutate } from "swr";
import { AuthContext } from "../Auth/Auth";
import { ToastAlerts } from "../Main/Notifications";

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
    let data = await deleteOfficer(id);
    ToastAlerts(data);
    mutate("officerData");
  }

  async function handleAdd(formValues) {
    let data = await addOfficer(formValues);
    ToastAlerts(data);
    mutate("officerData");
  }

  async function handleEdit(id, formValues) {
    let data = await updateOfficer(id, formValues);
    ToastAlerts(data);
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
    });
    toggleEditForm();
  }

  return (
    <div>
      <h2 className="component-title">Officers</h2>
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
          onSubmit={handleEdit.bind(null, formValues.id)}
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
              <div className="officer-title">{officer.title}</div>
              <div className="officer-description">{officer.description}</div>
              <div className="officer-email">Contact: {officer.email}</div>
            </div>
            {isAuthenticated() && (
              <div className="adminBtn-container">
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
