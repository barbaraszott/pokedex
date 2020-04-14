import React, { useState, useEffect } from "react";

import "./PokemonEvolution.scss";
import Spinner from "../../tools/Spinner";

function PokemonEvolution(props) {
  const { evolutionChainUrl, getEvolutionChain } = props;

  const [isLoading, setLoading] = useState(true);
  const [evolutions, setEvolutions] = useState({});

  useEffect(() => {
    getEvolutionChain(evolutionChainUrl).then((evolutions) => {
      setEvolutions(evolutions);
      setLoading(false);
    });
  }, [evolutionChainUrl, getEvolutionChain]);

  return <>{isLoading ? <Spinner /> : <span>Evolutions fetched</span>}</>;
}

export default React.memo(PokemonEvolution);
