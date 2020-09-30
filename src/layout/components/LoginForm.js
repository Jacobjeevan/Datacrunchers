import React, { useContext, Fragment } from "react";
import { AuthContext } from "../common/Auth";
import { loginUser } from "../../api/users";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

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
      <div className="formContent">
        <form onSubmit={handleSubmit(callSubmit)}>
          <input name="username" type="text" defaultValue="" ref={register} />
          {errors.username && <span>This field is required</span>}

          <input name="password" type="password" ref={register} />
          {errors.password && <span>This field is required</span>}

          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
}
