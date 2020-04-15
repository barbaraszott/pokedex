export default function getPokemonColor(color) {
  const pokemonColor = {
    blue: "#6AC8FB",
    green: "#70B44D",
    red: "#F1474A",
    yellow: "#F2C045",
    black: "#0B1811",
    brown: "#B38A6C",
    gray: "#737D86",
    pink: "#FD7D96",
    purple: "#915A9F",
    white: "#C6D3C9",
  };

  return pokemonColor[color];
}
