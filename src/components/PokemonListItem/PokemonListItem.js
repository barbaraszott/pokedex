import React from "react";

import getPokemonColor from "../../tools/pokemonColor";
import "./PokemonListItem.scss";
import noPic from "../../tools/no-picture.png";

function PokemonListItem(props) {
  const { name, id, sprites, types, color } = props;

  const backgroundColor = {
    backgroundColor: getPokemonColor(color),
  };

  const pokemonPicture = sprites.front_default ? sprites.front_default : noPic;

  return (
    <div className="list-item-container" style={backgroundColor}>
      <h2 className="name">
        {name} <span className="id">#{id}</span>
      </h2>
      <section className="info">
        <figure className="pokemon-img-container">
          <img src={pokemonPicture} alt="" className="pokemon-img-container__img"></img>
        </figure>
        <div className="types-container">
          {types.map((type) => (
            <span className="types-container__type" key={`${name}-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PokemonListItem;
