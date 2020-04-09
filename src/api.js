import axios from "axios";

export async function getPokemonTypes() {
  const pokeApiTypeCall = "https://pokeapi.co/api/v2/type";
  const typeList = await axios.get(pokeApiTypeCall).then((response) => response.data.results);
  const types = typeList.map((type) => type.name);

  return types;
}

async function catchAll({ limit, offset }) {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon";
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

async function catchWithType({ limit, offset, type }) {
  const pokemonList = await axios
    .get(`https://pokeapi.co/api/v2/type/${type}`)
    .then((response) => response.data.pokemon);

  const promises = pokemonList
    .slice(offset, offset + limit)
    .map((pokemonData) => catchPokemonData(pokemonData.pokemon.name));
  const pokemons = await Promise.all(promises);
  const count = pokemonList.length;

  return { pokemons, count };
}

export async function gottaCatchThemAll({ limit, offset, type }) {
  if (type) {
    return catchWithType({ limit, offset, type });
  } else {
    return catchAll({ limit, offset });
  }
}

export function catchPokemonData(name) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.data);
}
