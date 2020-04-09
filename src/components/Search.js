import React, { useEffect, useState } from "react";

import { getPokemonTypes } from "../api";

function Search(props) {
  const { onTypeSearch } = props;

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getPokemonTypes().then((types) => {
      setTypes(types);
    });
  }, []);

  return (
    <form>
      <label htmlFor="type">Choose a type:</label>
      <select id="type" onChange={onTypeSearch}>
        <option value="all" key={`type-all`}>
          All
        </option>
        {types.map((type) => (
          <option value={type} key={`type-${type}`}>
            {type}
          </option>
        ))}
      </select>
    </form>
  );
}

export default Search;
