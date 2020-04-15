import React from "react";

import "./Filter.scss";

function Filter(props) {
  const { onTypeSearch, currentType, typesList } = props;

  return (
    <form className="filter-form">
      <div className="filter-form--type">
        <label htmlFor="type" aria-label="Choose pokemons' type to show" className="filter__label">
          Pokemon type:{" "}
        </label>
        <select id="type" onChange={onTypeSearch} value={currentType} className="filter__select">
          {typesList.map((type) => (
            <option value={type} key={`type-${type}`}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default React.memo(Filter);
