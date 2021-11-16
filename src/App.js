import Movies from "./components/movies.jsx";
import Navbar from "./components/navbar.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container mt-3">
        <Switch>
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
