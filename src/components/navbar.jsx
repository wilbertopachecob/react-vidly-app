import React from 'react';
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">Vidly</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className="nav-link active" to="/movies">Movies</NavLink>
                <NavLink className="nav-link" to="/customers">Customers</NavLink>
                <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
            </div>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;