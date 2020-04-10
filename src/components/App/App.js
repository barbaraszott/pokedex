import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PokemonPage from "../PokemonPage/PokemonPage";
import PokemonList from "../PokemonList/PokemonList";

import "./App.scss";

function App() {
  return (
    <Router>
      <main className="content">
        <Route path="/" exact>
          <PokemonList />
        </Route>
        <Route path="/pokemon/:name">
          <PokemonPage />
        </Route>
      </main>
    </Router>
  );
}

export default App;
