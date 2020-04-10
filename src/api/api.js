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

export async function catchPokemonData(pokemonName) {
  const allPokemonData = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.data);

  const { id, height, weight, sprites, name } = allPokemonData;
  const abilities = allPokemonData.abilities.map((abilityData) => abilityData.ability.name);
  const moves = allPokemonData.moves.map((moveData) => moveData.move.name);
  const stats = allPokemonData.stats.map((statData) => {
    return { name: statData.stat.name, baseStat: statData.base_stat };
  });
  const types = allPokemonData.types.map((typeData) => typeData.type.name);
  const speciesName = allPokemonData.species.name;

  const pokemonData = { name, id, height, weight, types, abilities, stats, moves, sprites };
  const pokemonSpeciesData = await getPokemonSpeciesData(speciesName);

  return { ...pokemonData, ...pokemonSpeciesData };
}

// export async function getEvolutionChain(evolutionChainUrl, speciesName) {
//   const evolutionData = await axios.get(evolutionChainUrl).then(response => response.data.chain);

// }

export async function getPokemonSpeciesData(speciesName) {
  const speciesData = await axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`)
    .then((response) => response.data);

  const generation = speciesData.generation ? speciesData.generation.name : null;
  const color = speciesData.color ? speciesData.color.name : null;
  const habitat = speciesData.habitat ? speciesData.habitat.name : null;
  const hasGenderDifferences = speciesData.has_gender_differences || false;
  const description = speciesData.flavor_text_entries.find((data) => data.language.name === "en").flavor_text;
  const evolutionChainUrl = speciesData.evolution_chain ? speciesData.evolution_chain.url : null;

  return { color, habitat, generation, description, hasGenderDifferences, evolutionChainUrl };
}
