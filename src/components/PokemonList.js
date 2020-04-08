import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PokemonListItem from "./PokemonListItem";
import { catchPokemonData } from "../api";

async function gottaCatchThemAll() {
  const pokemonList = await axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => response.data.results);
  const promises = pokemonList.map((pokemon) => catchPokemonData(pokemon.name));
  const pokemons = await Promise.all(promises);

  return pokemons;
}

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    gottaCatchThemAll().then((pokemons) => setPokemonList(pokemons));
  }, []);

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
