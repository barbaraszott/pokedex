import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PokemonListItem from "./PokemonListItem";
import Pagination from "./Pagination";
import { gottaCatchThemAll } from "../api";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const limit = 5;
  const offset = currentPage * limit;

  function onPageClick(event) {
    const clickedPage = +event.target.dataset.page;
    setCurrentPage(clickedPage);
  }

  useEffect(() => {
    gottaCatchThemAll(limit, offset).then(({ pokemons, count }) => {
      setPokemonList(pokemons);
      setPokemonCount(count);
    });
  }, [offset]);

  return (
    <>
      <p>Pokemon count: {pokemonCount}</p>
      <section className="pokemon-list" id="pokemons">
        {pokemonList.map((data) => (
          <Link to={`/pokemon/${data.name}`} key={data.id}>
            <PokemonListItem {...data} />
          </Link>
        ))}
      </section>

      <Pagination currentPage={currentPage} count={pokemonCount} limit={limit} onPageClick={onPageClick} />
    </>
  );
}

export default PokemonList;
