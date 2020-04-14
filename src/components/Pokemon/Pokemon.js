import React from "react";
import { Route, Switch, NavLink, useRouteMatch, Redirect } from "react-router-dom";

import PokemonAbout from "../PokemonAbout/PokemonAbout";
import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import PokemonStats from "../PokemonStats/PokemonStats";
import PokemonMoves from "../PokemonMoves/PokemonMoves";

import * as noPic from "../../tools/no-picture.png";
import "./Pokemon.scss";

function Pokemon(props) {
  const {
    name,
    id,
    height,
    weight,
    types,
    abilities,
    stats,
    moves,
    sprites,
    color,
    habitat,
    generation,
    description,
    hasGenderDifferences,
    evolutionChainUrl,
    pokemonColor,
    species,
  } = props;

  const pokemonPicture = sprites.front_default ? sprites.front_default : noPic;

  const aboutProps = { description, species, height, weight, abilities, habitat, generation };

  let routeMatch = useRouteMatch();

  return (
    <>
      <section className="pokemon__header" style={{ backgroundColor: pokemonColor }}>
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
          <NavLink
            to={`${routeMatch.url}/about`}
            className="pokemon-info__navigation__link"
            activeClassName="pokemon-info__navigation__link--selected"
          >
            About
          </NavLink>
          <NavLink
            to={`${routeMatch.url}/stats`}
            className="pokemon-info__navigation__link"
            activeClassName="pokemon-info__navigation__link--selected"
          >
            Base Stats
          </NavLink>
          <NavLink
            to={`${routeMatch.url}/evolution`}
            className="pokemon-info__navigation__link"
            activeClassName="pokemon-info__navigation__link--selected"
          >
            Evolution
          </NavLink>
          <NavLink
            to={`${routeMatch.url}/moves`}
            className="pokemon-info__navigation__link"
            activeClassName="pokemon-info__navigation__link--selected"
          >
            Moves
          </NavLink>
        </nav>
        <Switch>
          <Route path={`${routeMatch.url}/about`}>
            <PokemonAbout {...aboutProps} />
          </Route>
          <Route path={`${routeMatch.url}/stats`}>
            <PokemonStats stats={stats} />
          </Route>
          <Route path={`${routeMatch.url}/evolution`}>
            <PokemonEvolution />
          </Route>
          <Route path={`${routeMatch.url}/moves`}>
            <PokemonMoves />
          </Route>
          <Redirect to={`${routeMatch.url}/about`} />
        </Switch>
      </main>
    </>
  );
}

export default Pokemon;
