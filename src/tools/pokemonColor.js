export default function getPokemonColor(color) {
  const pokemonColor = {
    green: "#49d0b0",
    red: "#fc6c6d",
    blue: "#76befe",
    yellow: "#ffd76f",
  };

  return pokemonColor[color] || color;
}
