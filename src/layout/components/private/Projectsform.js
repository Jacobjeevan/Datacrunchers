import React from "react";
import FormField from "./Formfield";
import "../../../css/projectsform.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  authors: Yup.string()
    .min(10, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  github: Yup.string()
    .min(10, "Too Short!")
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
        <Formik
          initialValues={formValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FormField
                control="ProjectTitle"
                label="Title"
                type="text"
                text="Enter the name of the Project"
                value={formValues.title}
                onChange={(e) => setformValue("title", e.target.value)}
                onBlur={handleBlur}
                className={errors.title && touched.title ? "error" : null}
              />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}

              <FormField
                control="ProjectDesc"
                label="Description"
                type="text"
                text="Enter brief information about the Project"
                value={formValues.description}
                onChange={(e) => setformValue("description", e.target.value)}
                onBlur={handleBlur}
                className={
                  errors.description && touched.description ? "error" : null
                }
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}

              <FormField
                control="ProjectAuthor"
                label="Authors"
                type="text"
                text="Enter Name of Authors"
                value={formValues.authors}
                onChange={(e) => setformValue("authors", e.target.value)}
                onBlur={handleBlur}
                className={errors.authors && touched.authors ? "error" : null}
              />
              {errors.authors && touched.authors ? (
                <div>{errors.authors}</div>
              ) : null}

              <FormField
                control="ProjectLink"
                label="Github"
                type="text"
                text="Enter Link to the Project"
                value={formValues.github}
                onChange={(e) => setformValue("github", e.target.value)}
                onBlur={handleBlur}
                className={errors.github && touched.github ? "error" : null}
              />
              {errors.github && touched.github ? (
                <div>{errors.github}</div>
              ) : null}

              <button
                type="submit"
                className="submitBtn"
                disabled={isSubmitting}
              >
                Submit
              </button>

              <button
                type="button"
                className="cancelBtn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </animated.div>
  );
}
