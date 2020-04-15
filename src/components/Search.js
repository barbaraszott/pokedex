import React from "react";

function Search(props) {
  const { onTypeSearch, currentType, typesList } = props;

  return (
    <form>
      <label htmlFor="type">Choose pokemon type:</label>
      <select id="type" onChange={onTypeSearch} value={currentType}>
        {typesList.map((type) => (
          <option value={type} key={`type-${type}`}>
            {type}
          </option>
        ))}
      </select>
    </form>
  );
}

export default React.memo(Search);
