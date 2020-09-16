import React from "react";
import FormField from "./Formfield";
import "../../../css/projectsform.css";
import Form from "react-bootstrap/Form";
/* import { useAuth0 } from "@auth0/auth0-react";
 */
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

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
  const [props, set] = useSpring(() => ({
    opacity: 1,
    from: { opacity: 0 },
  }));

  const setformValue = (field, value) =>
    setformValues((old) => ({ ...old, [field]: value }));

  useEffect(() => {
    setformValues(initialFormValues);
  }, [initialFormValues]);

  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  function changeEffect() {
    set({
      opacity: 0,
      from: {
        opacity: 1,
      },
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formValues);
    setformValues(defaultFormValues);
  };

  const handleCancel = () => {
    changeEffect();
    setTimeout(() => toggle(), 200);
  };

  return (
    <animated.div style={props}>
      <div className="formContent">
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

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <button type="button" className="cancelBtn" onClick={handleCancel}>
            Cancel
          </button>
        </Form>
      </div>
    </animated.div>
  );
}
