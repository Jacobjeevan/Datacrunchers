import React, { useContext, Fragment } from "react";
import { AuthContext } from "../common/Auth";
import { registerUser } from "../../api/users";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

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
      <div className="formContent">
        <form onSubmit={handleSubmit(callSubmit)}>
          <input name="email" type="email" defaultValue="" ref={register} />
          {errors.email?.message}

          <input name="username" type="text" defaultValue="" ref={register} />
          {errors.username?.message}

          <input name="password" type="password" ref={register} />
          {errors.password?.message}

          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
}
