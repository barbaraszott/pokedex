import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Pokemon from "./Pokemon";
import { catchPokemonData } from "../api";

function PokemonPage() {
  const [pokemonData, setPokemonData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    catchPokemonData(name).then((data) => {
      setPokemonData(data);
      document.title = `Viewing ${data.name}`;
    });
  }, [name]);

  return (
    <>
      <Link to="/">Go Back to Pokemon List</Link>
      {pokemonData ? <Pokemon {...pokemonData} /> : "Loading"}
    </>
  );
}

export default PokemonPage;
