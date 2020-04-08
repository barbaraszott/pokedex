import axios from "axios";

export async function gottaCatchThemAll() {
  const pokemonList = await axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => response.data.results);
  const promises = pokemonList.map((pokemon) => catchPokemonData(pokemon.name));
  const pokemons = await Promise.all(promises);

  return pokemons;
}

export function catchPokemonData(name) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.data);
}
