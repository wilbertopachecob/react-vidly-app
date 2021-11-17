import { useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";

function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const form = Form(data, setData, errors, setErrors, schema);

  return (
    <form onSubmit={(e) => form.handleSubmit(e)}>
      <h1>Login</h1>
      {form.renderInput('username', 'Username')}
      {form.renderInput('password', 'Password', 'password')}
      {form.renderSubmitButton()}
    </form>
  );
}

export default LoginForm;
