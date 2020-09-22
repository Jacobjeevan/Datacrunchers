import React from "react";
import FormField from "./Formfield";
import "../../../css/officersform.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormFile } from "react-bootstrap";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  imageName: Yup.string().required("Required"),
});

const defaultFormValues = {
  name: "",
  title: "",
  description: "",
  email: "",
  imageName: "",
};

export default function Officersform({
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
    evt.profficerDefault();
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
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {errors.name && touched.name ? (
                <div className="error-text">{errors.name}</div>
              ) : null}
              <FormField
                control="OfficerName"
                label="Name"
                type="text"
                text="Enter the name of the Officer"
                value={formValues.name}
                onChange={(e) => setformValue("name", e.target.value)}
                onBlur={handleBlur}
                className={errors.name && touched.name ? "error" : null}
              />

              {errors.title && touched.title ? (
                <div className="error-text">{errors.title}</div>
              ) : null}
              <FormField
                control="OfficerTitle"
                label="Title"
                type="text"
                text="Enter the Title/Position of the Officer"
                value={formValues.title}
                onChange={(e) => setformValue("title", e.target.value)}
                onBlur={handleBlur}
                className={errors.title && touched.title ? "error" : null}
              />

              {errors.description && touched.description ? (
                <div className="error-text">{errors.description}</div>
              ) : null}
              <FormField
                control="OfficerDesc"
                label="Description"
                type="text"
                text="Enter brief description (major/dept) about the officer"
                value={formValues.description}
                onChange={(e) => setformValue("description", e.target.value)}
                onBlur={handleBlur}
                className={
                  errors.description && touched.description ? "error" : null
                }
              />

              {errors.location && touched.location ? (
                <div className="error-text">{errors.location}</div>
              ) : null}

              {errors.email && touched.email ? (
                <div className="error-text">{errors.email}</div>
              ) : null}
              <FormField
                control="OfficerEmail"
                label="Email"
                type="text"
                text="Enter Officer's Email"
                value={formValues.email}
                onChange={(e) => setformValue("email", e.target.value)}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "error" : null}
              />

              {errors.imageName && touched.imageName ? (
                <div className="error-text">{errors.imageName}</div>
              ) : null}
              <FormFile label="imageName">
                <FormFile.Label>Upload Officer's Photo</FormFile.Label>
                <FormFile.Input />
              </FormFile>

              <button type="submit" className="submitBtn">
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
