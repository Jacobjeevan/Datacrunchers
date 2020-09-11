import React from "react";
import FormField from "./Formfield";
import "../../../css/projectsform.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/* import { useAuth0 } from "@auth0/auth0-react";
 */
import { useState, useEffect } from "react";

const defaultFormValues = {
  title: "",
  description: "",
  authors: "",
  github: "",
};

export default function Projectsform({
  toggle,
  onSubmit,
  initialFormValues = defaultFormValues,
}) {
  const [formValues, setformValues] = useState(initialFormValues);

  const setformValue = (field, value) =>
    setformValues((old) => ({ ...old, [field]: value }));

  useEffect(() => {
    setformValues(initialFormValues);
  }, [initialFormValues]);

  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formValues);
    setformValues(defaultFormValues);
  };

  return (
    <div className="formContent">
      <span className="closeBtn" onClick={toggle}></span>
      <Form onSubmit={handleSubmit}>
        <FormField
          control="ProjectTitle"
          label="Title"
          type="text"
          text="Enter the name of the Project"
          value={formValues.title}
          onChange={(e) => setformValue("title", e.target.value)}
        />

        <FormField
          control="ProjectDesc"
          label="Description"
          type="text"
          text="Enter brief information about the Project"
          value={formValues.description}
          onChange={(e) => setformValue("description", e.target.value)}
        />

        <FormField
          control="ProjectAuthor"
          label="Authors"
          type="text"
          text="Enter Name of Authors"
          value={formValues.authors}
          onChange={(e) => setformValue("authors", e.target.value)}
        />

        <FormField
          control="ProjectLink"
          label="Github"
          type="text"
          text="Enter Link to the Project"
          value={formValues.github}
          onChange={(e) => setformValue("github", e.target.value)}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
