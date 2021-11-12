import Movies from "./components/movies.jsx";
import Navbar from "./components/navbar.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import Rentals from './components/rentals';
import Customers from './components/customers';
import NotFound from './components/not-found';


function App() {
  return (
    <main className="container">
      <Navbar />
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/customers" component={Customers} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/movies"/>
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
