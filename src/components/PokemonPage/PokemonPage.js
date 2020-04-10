import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import getPokemonColor from "../../tools/pokemonColor";
import Pokemon from "../Pokemon/Pokemon";
import { catchPokemonData } from "../../api/api";

import "./PokemonPage.scss";

function PokemonPage() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonColor, setPokemonColor] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    catchPokemonData(name).then((data) => {
      setPokemonData(data);
      document.title = `Viewing ${data.name}`;
      setPokemonColor(getPokemonColor(data.color));
    });
  }, [name]);

  return (
    <section className="pokemon-page" style={{ backgroundColor: pokemonColor }}>
      <Link to="/" className="back-arrow">
        &#129104;
      </Link>
      {pokemonData ? <Pokemon {...pokemonData} /> : "Loading"}
    </section>
  );
}

export default PokemonPage;
