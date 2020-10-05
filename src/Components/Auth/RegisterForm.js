import React, { useContext, Fragment } from "react";
import { AuthContext } from "./Auth";
import { registerUser } from "./authAPI";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import "./registerform.css";

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  username: Yup.string()
    .min(4, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function RegisterForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { user, setUser } = useContext(AuthContext);

  async function callSubmit(values) {
    const user = await registerUser(values);
    setUser(user);
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="registerFormContent">
        <h3>
          Register or <Link to="/Login">Sign In</Link>
        </h3>
        <form className="registerForm" onSubmit={handleSubmit(callSubmit)}>
          <div className="registerForm-element">
            <label className="registerForm-label">Email</label>
            <input name="email" type="email" defaultValue="" ref={register} />
            {errors.email?.message}
          </div>

          <div className="registerForm-element">
            <label className="registerForm-label">Username</label>
            <input name="username" type="text" defaultValue="" ref={register} />
            {errors.username?.message}
          </div>

          <div className="registerForm-element">
            <label className="registerForm-label">Password</label>
            <input name="password" type="password" ref={register} />
            {errors.password?.message}
          </div>

          <button type="submit" className="registerSubmitBtn">
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
}
