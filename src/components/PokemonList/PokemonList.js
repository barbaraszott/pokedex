import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import "./PokemonList.scss";

import PokemonListItem from "../PokemonListItem/PokemonListItem";
import Pagination from "../Pagination/Pagination";
import Search from "../Search";
import Spinner from "../../tools/Spinner";

function PokemonList(props) {
  const [isLoading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const { type, page } = useParams();

  const limit = 20;
  const offset = page * limit;
  let history = useHistory();

  const onTypeSearch = useCallback(
    (event) => {
      const searchedTyped = event.target.value;
      history.push(`/list/${searchedTyped}/0`);
    },
    [history]
  );

  const onPaginationClick = useCallback(
    (clickedPage) => {
      history.push(`/list/${type}/${clickedPage}`);
    },
    [history, type]
  );

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
        {isLoading && <Spinner />}
        {!isLoading && pokemonList.length === 0 && <span>No pokemons :(</span>}
        {!isLoading &&
          pokemonList.length > 0 &&
          pokemonList.map((data) => (
            <Link to={`/pokemon/${data.name}`} key={data.id} data-testid="pokemon-list-item">
              <PokemonListItem {...data} />
            </Link>
          ))}
      </section>

      {!isLoading && (
        <Pagination
          currentPageIndex={Number(page)}
          count={pokemonCount}
          limit={limit}
          onPageClick={onPaginationClick}
        />
      )}
    </section>
  );
}

export default React.memo(PokemonList);
