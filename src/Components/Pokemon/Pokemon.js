/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";

export default class Pokemon extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    types: [],
    description: " ",
    stats: {
      hp: " ",
      attack: " ",
      defense: " ",
      speed: " ",
      specialAttack: " ",
      specialDefense: " ",
    },

    height: " ",
    weight: " ",
    genderRatioMale: " ",
    genderRatioFemale: " ",
    evs: " ",
    hatchStep: " ",
  };

  async fetchData() {
    this.setState({ loading: true });
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "specialAttack":
          specialAttack = stat["base_stat"];
          break;
        case "specialDefense":
          specialDefense = stat["base_stat"];
          break;
      }
    });

    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.height * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        hatchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        Pokemon
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
