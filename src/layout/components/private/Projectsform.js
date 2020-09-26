import React from "react";
import "../../../css/projectsform.css";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { FormField } from "./FormField";

const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  authors: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  github: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

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
            text="Enter Project Title"
            value={formValues.title}
            ref={register}
            onChange={(e) => setformValue("title", e.target.value)}
            className={errors.title ? "error" : null}
            errorMessage={errors.title?.message}
          />
          <FormField
            label="Description"
            type="text"
            name="description"
            text="Enter Brief Description about the Project"
            value={formValues.description}
            ref={register}
            onChange={(e) => setformValue("description", e.target.value)}
            className={errors.description ? "error" : null}
            errorMessage={errors.description?.message}
          />

          <FormField
            label="Authors"
            type="text"
            name="authors"
            text="Enter Name of Authors"
            value={formValues.authors}
            ref={register}
            onChange={(e) => setformValue("authors", e.target.value)}
            className={errors.authors ? "error" : null}
            errorMessage={errors.authors?.message}
          />

          <FormField
            label="Github"
            type="text"
            name="github"
            text="Enter Link to the Project"
            value={formValues.github}
            ref={register}
            onChange={(e) => setformValue("github", e.target.value)}
            className={errors.github ? "error" : null}
            errorMessage={errors.github?.message}
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
