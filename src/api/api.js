// FETCH WRAPPER

async function apiFetch(apiUrl) {
  const response = await fetch(apiUrl);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Catching Pokemons was unsuccessful :( (${response.status})`);
  }
}

// CATCH ALL POKEMONS, NO MATTER TYPE

async function catchAll({ limit, offset }) {
  const pokeApi = "https://pokeapi.co/api/v2/pokemon";
  const pokeApiCall = `${pokeApi}?limit=${limit}&offset=${offset}`;
  const response = await apiFetch(pokeApiCall);
  const pokemonList = {
    pokemons: response.results,
    count: response.count,
  };
  const promises = pokemonList.pokemons.map((pokemon) => catchPokemonData(pokemon.name));
  const pokemons = await Promise.all(promises);
  const count = pokemonList.count;

  return { pokemons, count };
}

// CATCH ALL POKEMONS, WITH PARTICULAR TYPE

async function catchWithType({ limit, offset, type }) {
  const response = await apiFetch(`https://pokeapi.co/api/v2/type/${type}`);
  const pokemonList = response.pokemon;

  const promises = pokemonList
    .slice(offset, offset + limit)
    .map((pokemonData) => catchPokemonData(pokemonData.pokemon.name));
  const pokemons = await Promise.all(promises);
  const count = pokemonList.length;

  return { pokemons, count };
}

// CATCH POKEMONS

export async function gottaCatchThemAll({ limit, offset, type }) {
  if (type !== "all") {
    return catchWithType({ limit, offset, type });
  } else {
    return catchAll({ limit, offset });
  }
}

// FIND ALL POKEMON DATA - USING ITS NAME

function fetchPokemonData(pokemonName) {
  return apiFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
}

// GET POKEMON'S PICTURES

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

// EXPORTS

// GET ALL POSSIBLE POKEMONS' TYPES

export async function getPokemonTypes() {
  const pokeApiTypeCall = "https://pokeapi.co/api/v2/type";
  const response = await apiFetch(pokeApiTypeCall);
  const typeList = response.results;
  const types = typeList.map((type) => type.name);

  return types;
}

// GET POKEMON'S SPECIES DATA BY USING ITS NAME  AND PREPARE IT FOR LATER USE

export async function getPokemonSpeciesData(speciesName) {
  const speciesData = await apiFetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`);

  const generation = speciesData.generation
    ? speciesData.generation.name.replace(/generation-/i, "").toUpperCase()
    : null;
  const species = speciesData.genera.find((data) => data.language.name === "en").genus;
  const color = speciesData.color ? speciesData.color.name : null;
  const habitat = speciesData.habitat ? speciesData.habitat.name : "unknown";
  const description = speciesData.flavor_text_entries.find((data) => data.language.name === "en").flavor_text;
  const evolutionChainUrl = speciesData.evolution_chain ? speciesData.evolution_chain.url : null;

  return { species, color, habitat, generation, description, evolutionChainUrl };
}

// CATCH POKEMON DATA BY USING ITS NAME AND PREPARE IT FOR LATER USE IN APP

export async function catchPokemonData(pokemonName) {
  const pokemonData = await fetchPokemonData(pokemonName);
  const { id, sprites } = pokemonData;
  const height = Number(pokemonData.height) / 10;
  const weight = Number(pokemonData.weight) / 10;
  const name = pokemonData.name;
  const pictures = getUsefulPictures(sprites);
  const abilities = pokemonData.abilities.map((abilityData) => abilityData.ability.name.replace(/-/g, " "));
  const moves = pokemonData.moves.map((moveData) => moveData.move.name.replace(/-/g, " "));
  const stats = pokemonData.stats.map((statData) => {
    return { name: statData.stat.name, baseStat: Number(statData.base_stat) };
  });
  const types = pokemonData.types.map((typeData) => typeData.type.name);
  const speciesName = pokemonData.species.name;

  const preparedPokemonData = { name, id, height, weight, types, abilities, stats, moves, pictures };
  const pokemonSpeciesData = await getPokemonSpeciesData(speciesName);

  return { ...preparedPokemonData, ...pokemonSpeciesData };
}

// GET EVOLUTION CHAIN DATA

function getNextEvolutions(evolutionData, evolutions = {}) {
  const nextEvolution = evolutionData.evolves_to[0];

  if (!nextEvolution) {
    return evolutions;
  }

  const nextEvolutionName = nextEvolution.species.name;
  const nextEvolutionLevel = nextEvolution.evolution_details[0].min_level || "?";

  evolutions[nextEvolutionName] = {
    level: nextEvolutionLevel,
  };

  getNextEvolutions(nextEvolution, evolutions);
}

export async function getEvolutionChain(evolutionChainUrl) {
  const response = await apiFetch(evolutionChainUrl);
  const evolutionData = response.chain;
  const evolutions = {};

  const first = evolutionData.species.name;
  evolutions[first] = {
    level: 0,
  };

  getNextEvolutions(evolutionData, evolutions);

  for (let pokemonName in evolutions) {
    const pokemonPictures = await fetchPokemonPicture(pokemonName);
    evolutions[pokemonName].pictures = pokemonPictures;
  }

  return evolutions;
}
