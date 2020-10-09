import React, { useContext } from "react";
import Careersform from "./Careersform";
import {
  useGetCareers,
  addCareer,
  deleteCareer,
  updateCareer,
} from "./careersAPI";
import "./careers.css";
import { useState } from "react";
import { mutate } from "swr";
import LinkButton from "../common/LinkButton";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { ToastAlerts } from "../Main/Notifications";

const defaultFormValues = {
  title: "",
  description: "",
};

const defaultFormDisplay = {
  createForm: false,
  editForm: false,
};

export default function Careers() {
  const { isAuthenticated } = useContext(AuthContext);
  const [displayForm, setdisplayForm] = useState(defaultFormDisplay);
  const [formValues, setformValues] = useState(defaultFormValues);
  const { isLoading, data, error } = useGetCareers();
  let { url } = useRouteMatch();

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
    let data = await deleteCareer(id);
    ToastAlerts(data);
    mutate("careerData");
  }

  async function handleAdd(formValues) {
    let data = await addCareer(formValues);
    ToastAlerts(data);
    mutate("careerData");
  }

  async function handleEdit(formValues) {
    let data = await updateCareer(formValues);
    ToastAlerts(data);
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
      {isAuthenticated() && (
        <button onClick={toggleCreateForm} className="submitBtn">
          Add Career
        </button>
      )}

      {isAuthenticated() && displayForm.createForm ? (
        <Careersform toggle={toggleCreateForm} onSubmit={handleAdd} />
      ) : null}
      {isAuthenticated() && displayForm.editForm ? (
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
              <div className="career-title">{career.title}</div>
            </div>
            <div className="cardBtn-container">
              <LinkButton
                to={`${url}/${career._id}`}
                className="viewBtn cardBtn"
              >
                View Details
              </LinkButton>
              {isAuthenticated() && (
                <div className="adminBtn-container">
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
          </div>
        ))}
      </div>
    </div>
  );
}
