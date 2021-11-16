import { useRef, useEffect, useState } from "react";

function LoginForm(props) {
  const [account, setAccount] = useState({username: '', password: ''});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()  
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted", emailRef.current.value, passwordRef.current.value);
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
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          value={account.username}
          onChange={handleChange}
          ref={emailRef}
          type="email"
          className="form-control"
          id="email"
          name="username"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          ref={passwordRef}
          value={account.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
