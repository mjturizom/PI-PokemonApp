import React from "react";
import './App.css';
import {Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home"

function App() {
  return (
    <React.Fragment>
    
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/pokemons" component={Home} />
    <Route path="/pokemons/:id" component={LandingPage} />
</React.Fragment>
  );
}

export default App;
