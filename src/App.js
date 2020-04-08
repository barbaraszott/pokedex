import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PokemonPage from "./components/PokemonPage";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <Router>
      <>
        <h1>Pokedex</h1>
        <Route path="/" exact>
          <PokemonList />
        </Route>
        <Route path="/pokemon/:name">
          <PokemonPage />
        </Route>
      </>
    </Router>
  );
}

export default App;
