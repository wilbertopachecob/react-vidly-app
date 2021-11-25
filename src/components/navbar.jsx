import React from "react";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";

function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
            {_.isEmpty(user) ? (
              <React.Fragment>
                {" "}
                <NavLink className="nav-link float-end" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link float-end" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="nav-link float-end" to="/profile">
                  Welcome {user.name}
                </NavLink>
                <NavLink className="nav-link float-end" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
