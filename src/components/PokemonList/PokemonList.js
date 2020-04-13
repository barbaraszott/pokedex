import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./PokemonList.scss";

import PokemonListItem from "../PokemonListItem/PokemonListItem";
import Pagination from "../Pagination/Pagination";
import Search from "../Search";
import Spinner from "../../tools/Spinner";

function PokemonList(props) {
  const [isLoading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [type, setType] = useState(null);

  const limit = 20;
  const offset = currentPage * limit;

  function onPageClick(page) {
    setCurrentPage(page);
  }

  function onTypeSearch(event) {
    const type = event.target.value;
    setType(type === "all" ? null : type);
    setCurrentPage(0);
  }

  useEffect(
    () => {
      if (!isLoading) {
        setLoading(true);
      }
      props.gottaCatchThemAll({ limit, offset, type }).then(({ pokemons, count }) => {
        setPokemonList(pokemons);
        setPokemonCount(count);
        setLoading(false);
      });
    },
    [offset, type] // eslint-disable-line
  );

  return (
    <section className="pokedex">
      <header>
        <h1>Pokedex</h1>
      </header>
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

      {!isLoading && (
        <Pagination currentPageIndex={currentPage} count={pokemonCount} limit={limit} onPageClick={onPageClick} />
      )}
    </section>
  );
}

export default PokemonList;
