import { useState } from "react";
import Joi from "joi-browser";
import Form from "./utils/forms-helper.js";
import { login } from "../services/authService";

function LoginForm({ history }) {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const form = Form(data, setData, errors, setErrors, schema);

  function storeToken(token) {
    localStorage.setItem("token", token);
  }

  async function handleSubmit(e) {
    const isValid = form.handleSubmit(e);
    if (isValid === false) {
      return;
    }

    try {
      const { data: token } = await login(data.username, data.password);
      storeToken(token);
      history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorsCopy = { ...errors };
        errorsCopy.username = error.response.data;
        setErrors(errorsCopy);
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
      {form.renderInput("username", "Username")}
      {form.renderInput("password", "Password", "password")}
      {form.renderSubmitButton()}
    </form>
  );
}

export default LoginForm;
