import React from "react";
import FormField from "./Formfield";
import "../../../css/careersform.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const defaultFormValues = {
  title: "",
  description: "",
};

export default function Careersform({
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
            control="CareerTitle"
            label="Title"
            type="text"
            text="Enter the name of the Career"
            value={formValues.title}
            onChange={(e) => setformValue("title", e.target.value)}
          />

          <FormField
            control="CareerDesc"
            label="Description"
            type="text"
            text="Enter brief information about the Career"
            value={formValues.description}
            onChange={(e) => setformValue("description", e.target.value)}
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
