import React from "react";

import "./Spinner.scss";

function Spinner() {
  return (
    <div data-testid="spinner" className="spinner-container">
      <div className="spinner" />
    </div>
  );
}

export default Spinner;
