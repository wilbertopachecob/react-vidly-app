import { useRef, useEffect, useState } from "react";

function LoginForm() {
  const [account, setAccount] = useState({username: '', password: ''});
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()  
    }
  }, [])

  function validate() {
    const errors = {}  
    if(account.username.trim() === '') {
      errors.username = 'Username is required';
    }

    if(account.password.trim() === '') {
      errors.password = 'Password is required';
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

  function handleChange({currentTarget: input}) {
   const currentState = {...account};
   currentState[input.name] = input.value;
   setAccount(currentState); 
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Email address
        </label>
        <input
          value={account.username}
          onChange={handleChange}
          ref={emailRef}
          type="email"
          className="form-control"
          id="username"
          name="username"
          aria-describedby="emailHelp"
        />
        {errors.username && <div className="alert alert-danger mt-1">
          {errors.username}
        </div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          value={account.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
        {errors.password && <div className="alert alert-danger mt-1">
          {errors.password}
        </div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
