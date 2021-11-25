import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import Movies from "./components/movies.jsx";
import Navbar from "./components/navbar.jsx";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import LoginForm from './components/loginForm';
import RegisterForm from './components/register';
import NewMovie from './components/newMovie';

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState({})
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const user = jwtDecode(token);
        setUser(user)
      }
  },[])
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar user={user}/>
      <main className="container mt-3">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/movies/add" component={NewMovie} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
