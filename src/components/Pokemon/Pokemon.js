import React from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";

import PokemonAbout from "../PokemonAbout/PokemonAbout";
import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import PokemonStats from "../PokemonStats/PokemonStats";
import PokemonMoves from "../PokemonMoves/PokemonMoves";

import * as noPic from "../../tools/no-picture.png";
import "./Pokemon.scss";

function Pokemon(props) {
  const { name, id, height, sprites, stats, weight, abilities, types, backgroundColor } = props;

  const pokemonPicture = sprites.front_default ? sprites.front_default : noPic;

  let routeMatch = useRouteMatch();

  return (
    <>
      <section className="pokemon__header" style={{ backgroundColor }}>
        <h1 className="pokemon-page__name">
          {name} <span className="pokemon-page__id">#{id}</span>
        </h1>
        <div className="pokemon-page__types-container">
          {types.map((type) => (
            <span className="pokemon-page__types-container__type" key={`${name}-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <figure className="pokemon-page__img-container">
          <img src={pokemonPicture} alt="" className="pokemon-page__img-container__img"></img>
        </figure>
      </section>
      <main className="pokemon-info__content">
        <nav className="pokemon-info__navigation">
          <NavLink to={`${routeMatch.url}`}>About</NavLink>
          <NavLink to={`${routeMatch.url}/stats`}>BaseStats</NavLink>
          <NavLink to={`${routeMatch.url}/evolution`}>Evolution</NavLink>
          <NavLink to={`${routeMatch.url}/moves`}>Moves</NavLink>
        </nav>
        <Route path={`${routeMatch.url}`} exact>
          <PokemonAbout />
        </Route>
        <Route path={`${routeMatch.url}/stats`}>
          <PokemonStats />
        </Route>
        <Route path={`${routeMatch.url}/evolution`}>
          <PokemonEvolution />
        </Route>
        <Route path={`${routeMatch.url}/moves`}>
          <PokemonMoves />
        </Route>
      </main>
    </>
  );
}

export default Pokemon;
