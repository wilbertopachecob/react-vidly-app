import { useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";

function RegisterForm() {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Names"),
  };

  const form = Form(data, setData, errors, setErrors, schema);

  return (
    <form onSubmit={(e) => form.handleSubmit(e)}>
      <h1>Register</h1>
      {form.renderInput("username", "Username")}
      {form.renderInput("password", "Password", "password")}
      {form.renderInput("name", "Name")}
      {form.renderSubmitButton()}
    </form>
  );
}

export default RegisterForm;
