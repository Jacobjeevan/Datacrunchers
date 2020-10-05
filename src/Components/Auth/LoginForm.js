import React, { useContext, Fragment } from "react";
import { AuthContext } from "./Auth";
import { loginUser } from "./authAPI";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import "./loginform.css";

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { user, setUser } = useContext(AuthContext);

  async function callSubmit(values) {
    const user = await loginUser(values);
    setUser(user);
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="loginFormContent">
        <h3>
          Sign In or <Link to="/Register">Register</Link>
        </h3>
        <form className="loginForm" onSubmit={handleSubmit(callSubmit)}>
          <div className="loginForm-element">
            <label className="loginForm-label">Username</label>
            <input name="username" type="text" defaultValue="" ref={register} />
            {errors.username && <span>This field is required</span>}
          </div>
          <div className="loginForm-element">
            <label className="loginForm-label">Password</label>
            <input
              name="password"
              type="password"
              ref={register}
              className="loginForm-element"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button type="submit" className="loginSubmitBtn">
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
}
