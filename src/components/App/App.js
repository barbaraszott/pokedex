import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import PokemonPage from "../PokemonPage/PokemonPage";
import PokemonList from "../PokemonList/PokemonList";

import { gottaCatchThemAll } from "../../api/api";
import "./App.scss";

function App() {
  return (
    <Router>
      <main className="content">
        <Switch>
          <Route path="/list/:type/:page" exact>
            <PokemonList gottaCatchThemAll={gottaCatchThemAll} />
          </Route>
          <Route path="/pokemon/:name">
            <PokemonPage />
          </Route>
          <Redirect to="/list/all/0" />
        </Switch>
      </main>
    </Router>
  );
}

export default React.memo(App);
