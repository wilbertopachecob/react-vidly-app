import { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const schema = {
    username: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  };

  function validate() {
    const result = Joi.validate(account, schema, { abortEarly: false });
    if (!result.error) {
      return null;
    }

    const errors = {};
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors !== null) {
      return;
    }

    //call server
  }

  const handleChange = ({ currentTarget: input }) => {
    const currentState = { ...account };
    currentState[input.name] = input.value;
    setAccount(currentState);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
      <Input
        name="username"
        type="email"
        label="Email Address"
        onChange={handleChange}
        value={account.username}
        error={errors.username}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        onChange={handleChange}
        value={account.password}
        error={errors.password}
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
