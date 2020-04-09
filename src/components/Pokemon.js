import React from "react";

function Pokemon(props) {
  const { name, id, height, sprites, stats, weight, abilities, types } = props;

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
        <p>Abilities: {abilities.join(", ")}</p>
      </section>
    </>
  );
}

export default Pokemon;
