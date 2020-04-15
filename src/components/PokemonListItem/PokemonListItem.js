import React from "react";

import getPokemonColor from "../../tools/pokemonColor";
import "./PokemonListItem.scss";
import PokemonPicture from "../PokemonPicture/PokemonPicture";

function PokemonListItem(props) {
  const { id, pictures, types, color } = props;
  const name = props.name.replace(/-/g, " ");

  const backgroundColor = {
    backgroundColor: getPokemonColor(color),
  };

  // 404 possible, so careful with this resource
  // const pokemonImgSrc = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  return (
    <div className="list-item-container" style={backgroundColor}>
      <h2 className="name">
        {name} <span className="id">#{id}</span>
      </h2>
      <section className="info">
        <figure className="pokemon-img-container">
          <PokemonPicture picture={pictures.front} />
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

export default React.memo(PokemonListItem);
