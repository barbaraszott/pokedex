import React from "react";
import noPic from "../../tools/no-picture.png";

function PokemonPicture(props) {
  const picture = props.picture || noPic;

  return <img src={picture} alt=""></img>;
}

export default PokemonPicture;
