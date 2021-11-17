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
  const schemaOptions = { abortEarly: false };

  function validate() {
    const { error } = Joi.validate(account, schema, schemaOptions);
    if (!error) {
      return null;
    }

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

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
    const error = validateProperty(input);
    const errorState = { ...errors };
    errorState[input.name] = error;
    setErrors(errorState);

    const accountState = { ...account };
    accountState[input.name] = input.value;
    setAccount(accountState);
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
