import React from "react";
import "../common/form.css";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "../common/FormField";

const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  location: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  date: Yup.date().required("Required"),
});

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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const callSubmit = () => {
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
        <form onSubmit={handleSubmit(callSubmit)}>
          <FormField
            label="Title"
            type="text"
            name="title"
            text="Enter Event Title"
            value={formValues.title}
            ref={register}
            onChange={(e) => setformValue("title", e.target.value)}
            className={errors.title ? "error" : null}
            errorMessage={errors.title?.message}
          />

          <div className="form-element">
            <label className="form-label">Description</label>
            <p className="error-message">{errors.description?.message}</p>
            <textarea
              name="description"
              value={formValues.description}
              ref={register}
              onChange={(e) => setformValue("description", e.target.value)}
              className={(errors.description ? "error" : null) + " form-field"}
            ></textarea>
            <p className="form-element-desc">Enter Event Description</p>
          </div>

          <FormField
            label="Location"
            type="text"
            name="location"
            text="Enter Location of the Event"
            value={formValues.location}
            ref={register}
            onChange={(e) => setformValue("location", e.target.value)}
            className={errors.location ? "error" : null}
            errorMessage={errors.location?.message}
          />

          <FormField
            label="Date"
            type="text"
            name="date"
            text="Enter Date (format: mm/dd/year)"
            value={formValues.date}
            ref={register}
            onChange={(e) => setformValue("date", e.target.value)}
            className={errors.date ? "error" : null}
            errorMessage={errors.date?.message}
          />

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <button type="button" className="cancelBtn" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </animated.div>
  );
}
