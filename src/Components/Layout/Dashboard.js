import React, { Component } from "react";
import PokemonList from "../Pokemon/PokemonList";

export default class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.match)
  }
  render() {
    return (
      <div className="row">
        <div className="col">
          <PokemonList />
        </div>
      </div>
    );
  }
}
