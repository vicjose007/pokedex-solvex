/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";

export default class Pokemon extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    loading: true,
  };

  async fetchData() {
    this.setState({ loading: true });
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    
    
    
    this.setState({ name, loading: false });
  }

   componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        Pokemon {this.state.loading ? "Loading":"Done"}
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
