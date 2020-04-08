import React from "react";

function Pokemon(props) {
  const { name, id, height, sprites, stats, weight } = props;
  const types = props.types.map((data) => data.type.name);
  const abilities = props.abilities.map((data) => {
    return { name: data.ability.name, moreInfo: data.ability.url };
  });
  const moves = props.moves.map((data) => {
    return { name: data.move.name, moreInfo: data.move.url };
  });
  return (
    <>
      <h2>{name}</h2>
      <p className="id">#{id}</p>
      <figure>
        <img src={sprites.front_default} alt=""></img>
      </figure>
      <section className="about">
        <p>
          {`Type${types.length > 1 ? "s" : ""}`}: {types.join(", ")}
        </p>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
        <p>Abilities: {abilities.map((ability) => ability.name).join(", ")}</p>
      </section>
    </>
  );
}

export default Pokemon;
