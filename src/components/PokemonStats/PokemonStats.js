import React from "react";

import "./PokemonStats.scss";

function PokemonStats(props) {
  const pokemonStats = props.stats;
  const MAX_BASE_STAT = 255;
  const MAX_TOTAL = 6 * MAX_BASE_STAT;
  const totalPoints = pokemonStats.map((stats) => stats.baseStat).reduce((sum, current) => sum + current, 0);

  const progressStyles = (value, maxValue) => {
    const green = "#64b283";
    const red = "#c98283";
    const middle = Math.round(maxValue / 2);
    const backgroundColor = value > middle ? green : red;
    const progress = Math.round((value * 100) / maxValue);
    const width = `${progress}%`;

    return { backgroundColor, width };
  };

  return (
    <article className="pokemon-stats">
      {pokemonStats.map((stats) => {
        return (
          <section className="pokemon-stats__info" key={`pokemon-stats-${stats.name}`}>
            <span className="pokemon-stats__info__category">{stats.name.replace("-", " ")}</span>
            <span className="pokemon-stats__info__stat">{stats.baseStat}</span>
            <div className="pokemon-stats__info__stat-bar">
              <div
                className="pokemon-stats__info__stat-bar--progress"
                style={progressStyles(stats.baseStat, MAX_BASE_STAT)}
              ></div>
            </div>
          </section>
        );
      })}
      <section className="pokemon-stats__info" key={`pokemon-stats-total`}>
        <span className="pokemon-stats__info__category">total</span>
        <span className="pokemon-stats__info__stat">{totalPoints}</span>
        <div className="pokemon-stats__info__stat-bar">
          <div className="pokemon-stats__info__stat-bar--progress" style={progressStyles(totalPoints, MAX_TOTAL)}></div>
        </div>
      </section>
    </article>
  );
}

export default React.memo(PokemonStats);
