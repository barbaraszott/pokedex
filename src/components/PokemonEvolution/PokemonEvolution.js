import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./PokemonEvolution.scss";

import Spinner from "../Spinner/Spinner";
import PokemonPicture from "../PokemonPicture/PokemonPicture";

function showEvolutions(evolutions, levelBackgroundColor) {
  const evolutionsEntries = Object.entries(evolutions);

  return (
    <section className="pokemon-evolutions-container">
      {evolutionsEntries.map(([evolution, evolutionInfo]) => {
        return (
          <Link to={`/pokemon/${evolution}`} key={`evolution-${evolution}`} className="pokemon-evolution">
            <span className="pokemon-evolution__name">{evolution}</span>
            <figure className="pokemon-evolution__picture">
              <PokemonPicture picture={evolutionInfo.pictures.front} />
            </figure>
            <div className="pokemon-evolution__level" style={{ backgroundColor: levelBackgroundColor }}>
              {evolutionInfo.level}
            </div>
          </Link>
        );
      })}
    </section>
  );
}

function showUnknown(levelBackgroundColor) {
  return (
    <div className="pokemon-evolution">
      <span className="pokemon-evolution__name">No evolution data avaiable.</span>
      <figure className="pokemon-evolution__picture">
        <PokemonPicture picture={null} />
      </figure>
      <div className="pokemon-evolution__level" style={{ backgroundColor: levelBackgroundColor }}>
        ?
      </div>
    </div>
  );
}

function PokemonEvolution(props) {
  const { evolutionChainUrl, getEvolutionChain, levelBackgroundColor } = props;

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evolutions, setEvolutions] = useState({});

  useEffect(() => {
    getEvolutionChain(evolutionChainUrl)
      .then((evolutions) => {
        setEvolutions(evolutions);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [evolutionChainUrl, getEvolutionChain]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && showUnknown(levelBackgroundColor)}
      {!isLoading && !error && showEvolutions(evolutions, levelBackgroundColor)}
    </>
  );
}

export default React.memo(PokemonEvolution);
