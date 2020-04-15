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
  if (type !== "all") {
    return catchWithType({ limit, offset, type });
  } else {
    return catchAll({ limit, offset });
  }
}

function fetchPokemonData(pokemonName) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => response.data);
}

function getUsefulPictures(sprites) {
  const pictures = {
    front: sprites.front_default,
    back: sprites.back_default,
  };

  return pictures;
}

async function fetchPokemonPicture(pokemonName) {
  const pokemonData = await fetchPokemonData(pokemonName);

  return getUsefulPictures(pokemonData.sprites);
}

export async function catchPokemonData(pokemonName) {
  const pokemonData = await fetchPokemonData(pokemonName);
  const { id, height, weight, sprites, name } = pokemonData;
  const pictures = getUsefulPictures(sprites);
  const abilities = pokemonData.abilities.map((abilityData) => abilityData.ability.name);
  const moves = pokemonData.moves.map((moveData) => moveData.move.name);
  const stats = pokemonData.stats.map((statData) => {
    return { name: statData.stat.name, baseStat: statData.base_stat };
  });
  const types = pokemonData.types.map((typeData) => typeData.type.name);
  const speciesName = pokemonData.species.name;

  const preparedPokemonData = { name, id, height, weight, types, abilities, stats, moves, pictures };
  const pokemonSpeciesData = await getPokemonSpeciesData(speciesName);

  return { ...preparedPokemonData, ...pokemonSpeciesData };
}

export async function getEvolutionChain(evolutionChainUrl) {
  const evolutionData = await axios.get(evolutionChainUrl).then((response) => response.data.chain);
  const evolutions = {};

  const first = evolutionData.species.name;
  evolutions[first] = {
    level: 0,
  };

  const secondEvolution = evolutionData.evolves_to;
  if (secondEvolution.length !== 0) {
    const second = secondEvolution[0].species.name;
    const secondLevel = secondEvolution[0].evolution_details[0].min_level;
    evolutions[second] = {
      level: secondLevel,
    };

    const thirdEvolution = secondEvolution[0].evolves_to;
    if (thirdEvolution.length !== 0) {
      const third = thirdEvolution[0].species.name;
      const thirdLevel = thirdEvolution[0].evolution_details[0].min_level;
      evolutions[third] = {
        level: thirdLevel,
      };
    }
  }

  for (let pokemonName in evolutions) {
    evolutions[pokemonName].pictures = await fetchPokemonPicture(pokemonName);
  }

  return evolutions;
}

export async function getPokemonSpeciesData(speciesName) {
  const speciesData = await axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`)
    .then((response) => response.data);

  const generation = speciesData.generation ? speciesData.generation.name : null;
  const species = speciesData.genera.find((data) => data.language.name === "en").genus;
  const color = speciesData.color ? speciesData.color.name : null;
  const habitat = speciesData.habitat ? speciesData.habitat.name : "unknown";
  const description = speciesData.flavor_text_entries.find((data) => data.language.name === "en").flavor_text;
  const evolutionChainUrl = speciesData.evolution_chain ? speciesData.evolution_chain.url : null;

  return { species, color, habitat, generation, description, evolutionChainUrl };
}
