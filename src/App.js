import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    pokemons: [],
  };

  catchPokemonData = (pokemon) => {
    return axios.get(pokemon.url).then((response) => response.data);
  };

  gottaCatchThemAll = async () => {
    const pokemonList = await axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => response.data.results);
    const promises = pokemonList.map(this.catchPokemonData);
    const pokemons = await Promise.all(promises);

    this.setState({
      pokemons,
    });
  };

  componentDidMount() {
    this.gottaCatchThemAll();
  }

  render() {
    return (
      <>
      </>
    );
  }
}

export default App;
