import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import PokemonList from "./PokemonList";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import pokemonsData from "../../api/pokemons.json";

it("should display spinner while fetching data", async () => {
  const { getByTestId, queryByTestId } = render(
    <PokemonList gottaCatchThemAll={() => Promise.resolve({ pokemons: [], count: 0 })} />
  );

  getByTestId("spinner");

  await waitForElementToBeRemoved(() => queryByTestId("spinner"));
});

it("should display info if there are no pokemons to show", async () => {
  const { queryByText } = render(<PokemonList gottaCatchThemAll={() => Promise.resolve({ pokemons: [], count: 0 })} />);
  await waitFor(() => expect(queryByText(/No pokemons/)).toBeTruthy());
});

it("should display pokemon list items", async () => {
  const { queryAllByTestId } = render(
    <Router>
      <PokemonList gottaCatchThemAll={() => Promise.resolve({ pokemons: pokemonsData, count: 964 })} />
    </Router>
  );
  await waitFor(() => expect(queryAllByTestId("pokemon-list-item")).toHaveLength(20));
});
