/* eslint-disable no-unused-vars */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./Components/Layout/NavBar";
import Dashboard from "./Components/Layout/Dashboard";
import backgroundImage from "./pattern.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from './Components/Pokemon/Pokemon';
import { Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ background: `url(${backgroundImage})` }}>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
