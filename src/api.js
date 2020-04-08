import axios from "axios";

export async function gottaCatchThemAll(limit, offset) {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon/";
  const pokeApiCall = `${pokeApi}?limit=${limit}&offset=${offset}`;
  const pokemonList = await axios.get(pokeApiCall).then((response) => {
    return {
      pokemons: response.data.results,
      count: response.data.count,
    };
  });
  const promises = pokemonList.pokemons.map((pokemon) => catchPokemonData(pokemon.name));
  const pokemons = await Promise.all(promises);
  const count = pokemonList.count;

  return { pokemons, count };
}

export function catchPokemonData(name) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.data);
}
