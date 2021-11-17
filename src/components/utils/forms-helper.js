import Joi from "joi-browser";
import Input from "../common/input";

export const defaultSchemaOptions = { abortEarly: false };

export default function form(data, setData, errors, setErrors, schema) {
  function validate() {
    const { error } = Joi.validate(data, schema, defaultSchemaOptions);
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

    const dataState = { ...data };
    dataState[input.name] = input.value;
    setData(dataState);
  };

  function renderSubmitButton() {
    return (
      <button disabled={validate()} type="submit" className="btn btn-primary">
        Submit
      </button>
    );
  }

  function renderInput(name, label, type = 'text') {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        onChange={handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  }

  return {
    validate,
    validateProperty,
    handleSubmit,
    handleChange,
    renderSubmitButton,
    renderInput,
  };
}
