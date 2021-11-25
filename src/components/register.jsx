import { useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";
import { register } from "../services/userService";
import { toast } from 'react-toastify';

const initialData = { username: "", password: "", name: "" }

function RegisterForm() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Names"),
  };

  const form = Form(data, setData, errors, setErrors, schema);

  async function handleSubmit(e) {
    const isValid = form.handleSubmit(e);
    if (isValid === false) {
      return;
    }

    try {
      await register(data);
      setData(initialData);
      toast.success('User registered successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorsCopy = {...errors}
        errorsCopy.username = error.response.data;
        setErrors(errorsCopy);
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Register</h1>
      {form.renderInput("username", "Username")}
      {form.renderInput("password", "Password", "password")}
      {form.renderInput("name", "Name")}
      {form.renderSubmitButton()}
    </form>
  );
}

export default RegisterForm;
