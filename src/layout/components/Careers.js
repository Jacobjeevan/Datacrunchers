import React, { useContext } from "react";
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
import LinkButton from "./LinkButton";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "../common/Auth";

const defaultFormValues = {
  title: "",
  description: "",
};

const defaultFormDisplay = {
  createForm: false,
  editForm: false,
};

export default function Careers() {
  const { user } = useContext(AuthContext);
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

  const isAuthenticated = () => {
    if (user) {
      return true;
    }
    return false;
  };

  function toggleCreateForm() {
    setdisplayForm((old) => ({ ...old, createForm: !displayForm.createForm }));
  }

  function toggleEditForm(keepOpened = true) {
    if (displayForm.editForm & keepOpened) return;
    setdisplayForm((old) => ({ ...old, editForm: !displayForm.editForm }));
  }

  async function handleDelete(id) {
    await deleteCareer(id);
    mutate("careerData");
  }

  async function handleAdd(formValues) {
    await addCareer(formValues);
    mutate("careerData");
  }

  async function handleEdit(formValues) {
    await updateCareer(formValues);
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
              <div className="career-title">{career.title}</div>
            </div>
            <div className="cardBtn-container">
              <LinkButton
                to={`${url}/${career._id}`}
                className="viewBtn cardBtn"
              >
                View Details
              </LinkButton>
              {isAuthenticated && (
                <div>
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
