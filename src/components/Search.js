import React, { useEffect, useState } from "react";

import { getPokemonTypes } from "../api/api";

function Search(props) {
  const { onTypeSearch, currentType } = props;

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getPokemonTypes().then((types) => {
      setTypes(["all", ...types]);
    });
  }, []);

  return (
    <form>
      <label htmlFor="type">Choose pokemon type:</label>
      <select id="type" onChange={onTypeSearch} value={currentType}>
        {types.map((type) => (
          <option value={type} key={`type-${type}`}>
            {type}
          </option>
        ))}
      </select>
    </form>
  );
}

export default React.memo(Search);
