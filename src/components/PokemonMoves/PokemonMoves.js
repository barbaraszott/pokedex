import React from "react";

import "./PokemonMoves.scss";

function PokemonMoves(props) {
  const name = props.name[0].toUpperCase() + props.name.substr(1);
  const moves = props.moves.sort();

  return (
    <>
      <h2>All possible {name}'s moves</h2>
      <ul className="pokemon-moves-list">
        {moves.map((move) => (
          <li className="pokemon-moves-list__item" key={`pokemon-moves-${move}`}>
            {move.replace(/-/g, " ")}
          </li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(PokemonMoves);
