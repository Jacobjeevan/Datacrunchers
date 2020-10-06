import React from "react";
import "../common/form.css";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { FormField } from "../common/FormField";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  imageName: Yup.mixed().required("Image is Required"),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
});

const defaultFormValues = {
  name: "",
  title: "",
  description: "",
  email: "",
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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const callSubmit = () => {
    var formBody = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formBody.append(key, value);
    }
    var imageFile = document.querySelector(".headshot");
    formBody.append("imageName", imageFile.files[0]);
    onSubmit(formBody);
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
            label="Name"
            type="text"
            name="name"
            text="Enter Officer's name"
            value={formValues.name}
            ref={register}
            onChange={(e) => setformValue("name", e.target.value)}
            className={errors.name ? "error" : null}
            errorMessage={errors.name?.message}
          />

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

          <FormField
            label="Description"
            type="text"
            name="description"
            text="Enter a brief description about Officer (Major/Dept)"
            value={formValues.description}
            ref={register}
            onChange={(e) => setformValue("description", e.target.value)}
            className={errors.description ? "error" : null}
            errorMessage={errors.description?.message}
          />

          <FormField
            label="Email"
            type="text"
            name="email"
            text="Enter Officer's Email"
            value={formValues.email}
            ref={register}
            onChange={(e) => setformValue("email", e.target.value)}
            className={errors.email ? "error" : null}
            errorMessage={errors.email?.message}
          />

          <label className="form-label">Officer's headshot: </label>
          <input
            className="headshot"
            name="imageName"
            type="file"
            ref={register}
          />
          <p>{errors.imageName?.message}</p>
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
