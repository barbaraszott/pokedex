import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import PokemonList from "./PokemonList";

import pokemonsData from "../../api/pokemons.json";

it("should display spinner while fetching data", async () => {
  const { getByTestId, queryByTestId } = render(
    <Router>
      <PokemonList
        gottaCatchThemAll={() => Promise.resolve({ pokemons: [], count: 0 })}
        getPokemonTypes={() => Promise.resolve([])}
      />
    </Router>
  );

  getByTestId("spinner");

  await waitForElementToBeRemoved(() => queryByTestId("spinner"));
});

it("should display info if there are no pokemons to show", async () => {
  const { getByTestId } = render(
    <Router>
      <PokemonList
        gottaCatchThemAll={() => Promise.resolve({ pokemons: [], count: 0 })}
        getPokemonTypes={() => Promise.resolve([])}
      />
    </Router>
  );
  await waitFor(() => expect(getByTestId("no-pokemons")).toBeTruthy());
});

it("should display pokemon list items", async () => {
  const { queryAllByTestId } = render(
    <Router>
      <PokemonList
        gottaCatchThemAll={() => Promise.resolve({ pokemons: pokemonsData, count: 964 })}
        getPokemonTypes={() => {
          return Promise.resolve(["all"]);
        }}
      />
    </Router>
  );
  await waitFor(() => expect(queryAllByTestId("pokemon-list-item")).toHaveLength(20));
});

it("should set error if error occured", async () => {
  const { getByTestId, queryByTestId } = render(
    <Router>
      <PokemonList
        gottaCatchThemAll={() => Promise.reject({ pokemons: [], count: 0 })}
        getPokemonTypes={() => Promise.resolve([])}
      />
    </Router>
  );

  await waitForElementToBeRemoved(() => queryByTestId("spinner"));

  getByTestId("error");
});
