import React from "react";

function PokemonListItem(props) {
  const { name, id, sprites, types } = props;

  return (
    <>
      <h2>{name}</h2>
      <p className="id">#{id}</p>
      <figure>
        <img src={sprites.front_default} alt=""></img>
      </figure>
      <p>
        {`Type${types.length > 1 ? "s" : ""}`}: {types.join(", ")}
      </p>
    </>
  );
}

export default PokemonListItem;
