/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./PokemonCard.css";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
 class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false,
  };
  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[6];
    const imageUrl = `https://github.com/PokeApi/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
    });
  }
  render() {
    return (
      <div className="col-mid-3 col-sm-3 mb-5">
        <Link to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
            <img
              className="card-img-top rounded mx-auto mt-2 PokemonCardImage"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              src={this.state.imageUrl}
              alt="pokemon Image"
            />
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {this.state.name
                  .toLocaleLowerCase()
                  .split(" ")
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </h6>
            </div>
          </Card>
        </Link>
      </div>
    );
  }
}           

export default withRouter(PokemonCard)