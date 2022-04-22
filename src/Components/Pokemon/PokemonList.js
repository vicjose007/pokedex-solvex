/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    pokemon: null,
  };
  async fetchData() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    const { data } = await axios.get(url);
    this.setState({ pokemon: data["results"] });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading pokemon</h1>
        )}
      </React.Fragment>
    );
  }
}
