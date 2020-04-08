import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PokemonListItem from "./PokemonListItem";
import { gottaCatchThemAll } from "../api";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    gottaCatchThemAll(limit, offset).then(({ pokemons, count }) => {
      setPokemonList(pokemons);
      setPokemonCount(count);
    });
  }, [offset]);

  return (
    <section className="pokemon-list" id="pokemons">
      {pokemonList.map((data) => (
        <Link to={`/pokemon/${data.name}`} key={data.id}>
          <PokemonListItem {...data} />
        </Link>
      ))}
    </section>
  );
}

export default PokemonList;
