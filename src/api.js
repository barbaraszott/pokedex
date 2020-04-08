import axios from "axios";

export function catchPokemonData(name) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.data);
}
