import { useState } from "react";
import Input from "./common/input";

function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errors = {};
    if (account.username.trim() === "") {
      errors.username = "Username is required";
    }

    if (account.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
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
        label="Email Address"
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
