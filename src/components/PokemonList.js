import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PokemonListItem from "./PokemonListItem";
import Pagination from "./Pagination";
import { gottaCatchThemAll } from "../api";
import Search from "./Search";
import Spinner from "./Spinner";

function PokemonList() {
  const [isLoading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [type, setType] = useState(null);

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
  function onTypeSearch(event) {
    const type = event.target.value;
    setType(type === "all" ? null : type);
    setCurrentPage(0);
  }


  return (
    <>
      <p>Pokemon count: {pokemonCount}</p>
      <section className="pokemon-search">
        <Search onTypeSearch={onTypeSearch} />
      </section>
      <section className="pokemon-list" id="pokemons">
        {isLoading ? (
          <Spinner />
        ) : (
          pokemonList.map((data) => (
            <Link to={`/pokemon/${data.name}`} key={data.id}>
              <PokemonListItem {...data} />
            </Link>
          ))
        )}
      </section>

      <Pagination currentPage={currentPage} count={pokemonCount} limit={limit} onPageClick={onPageClick} />
    </>
  );
}

export default PokemonList;
