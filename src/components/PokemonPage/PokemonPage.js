import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import getPokemonColor from "../../tools/pokemonColor";
import Pokemon from "../Pokemon/Pokemon";
import { catchPokemonData } from "../../api/api";

import "./PokemonPage.scss";

function PokemonPage() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonColor, setPokemonColor] = useState(null);
  const { name } = useParams();

  let history = useHistory();

  useEffect(() => {
    catchPokemonData(name).then((data) => {
      setPokemonData(data);
      const nameToShowInTitle = data.name
        .split("-")
        .map((name) => name[0].toUpperCase() + name.substr(1))
        .join(" ");
      document.title = `Viewing ${nameToShowInTitle}`;
      setPokemonColor(getPokemonColor(data.color));
    });
  }, [name]);

  return (
    <section className="pokemon-page">
      <button className="back-arrow" onClick={() => history.goBack()}>
        &#129104;
      </button>
      {pokemonData ? <Pokemon {...pokemonData} pokemonColor={pokemonColor} /> : "Loading"}
    </section>
  );
}

export default React.memo(PokemonPage);
