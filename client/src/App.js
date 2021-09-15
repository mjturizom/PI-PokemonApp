import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Home from "./components/Home/Home.js";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon.js"
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/pokemons/:id" component={PokemonDetail} />
          <Route path="/newpokemon" component={CreatePokemon} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
