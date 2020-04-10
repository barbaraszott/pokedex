import React from "react";

import * as noPic from "../../tools/no-picture.png";
import "./Pokemon.scss";

function Pokemon(props) {
  const { name, id, height, sprites, stats, weight, abilities, types } = props;

  const pokemonPicture = sprites.front_default ? sprites.front_default : noPic;

  return (
    <>
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
      <section className="pokemon-about">
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
        <p>Abilities: {abilities.join(", ")}</p>
      </section>
    </>
  );
}

export default Pokemon;
