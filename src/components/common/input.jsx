import React from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
};

function Input({ name, label, error, onChange, value, type = 'text' }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        name={name}
        aria-describedby={name}
      />
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
}

export default Input;
