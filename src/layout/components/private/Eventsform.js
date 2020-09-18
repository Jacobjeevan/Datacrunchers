import React from "react";
import FormField from "./Formfield";
import "../../../css/eventsform.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const defaultFormValues = {
  title: "",
  description: "",
  location: "",
  date: "",
};

export default function Eventsform({
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
        <span className="closeBtn" onClick={toggle}></span>
        <Form onSubmit={handleSubmit}>
          <FormField
            control="EventTitle"
            label="Title"
            type="text"
            text="Enter the name of the Event"
            value={formValues.title}
            onChange={(e) => setformValue("title", e.target.value)}
          />

          <FormField
            control="EventDesc"
            label="Description"
            type="text"
            text="Enter brief information (as well as time)"
            value={formValues.description}
            onChange={(e) => setformValue("description", e.target.value)}
          />

          <FormField
            control="EventLocation"
            label="Location"
            type="text"
            text="Enter Location of the Event"
            value={formValues.location}
            onChange={(e) => setformValue("location", e.target.value)}
          />

          <FormField
            control="EventDate"
            label="Date"
            type="text"
            text="Enter Date"
            value={formValues.date}
            onChange={(e) => setformValue("date", e.target.value)}
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
