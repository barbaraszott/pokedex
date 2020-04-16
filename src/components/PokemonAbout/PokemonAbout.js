import React from "react";

import "./PokemonAbout.scss";
function PokemonAbout(props) {
  const description = props.description;
  const pokemonData = {
    species: props.species,
    height: props.height + "m",
    weight: props.weight + "kg",
    abilities: props.abilities.join(", "),
    habitat: props.habitat,
    generation: props.generation,
  };
  const pokemonDataEntries = Object.entries(pokemonData);

  return (
    <article className="pokemon-about">
      <p className="pokemon-about__description">{description}</p>
      <section>
        {pokemonDataEntries.map(([categoryName, info]) => {
          return (
            <p className="pokemon-about__info" key={`pokemon-about-${categoryName}`}>
              <span className="pokemon-about__info__category">{categoryName}</span>
              {info}
            </p>
          );
        })}
      </section>
    </article>
  );
}

export default React.memo(PokemonAbout);
