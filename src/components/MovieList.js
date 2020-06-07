import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

const CardWrapper = styled.div`
  margin: 15px;
`;

let imgStyle = {
  height: "200px",
  width: "200px",
  margin: "0 auto",
  padding: "10px",
  borderRadius: 82,
};

export class MovieList extends Component {
  render() {
    let { movielist } = this.props;
    return (
      <div>
        {movielist &&
          movielist.map((movie) => (
            <CardWrapper key={movie.imdbID}>
              <Card style={{ width: "15rem", borderRadius: "1 rem" }}>
                <Card.Img style={imgStyle} variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text> Date of release : {movie.Year}</Card.Text>
                  <Button
                    style={{
                      background: "#bc3232",
                      borderColor: "transparent",
                      color: "#ffffff",
                    }}
                    size="sm"
                    variant="primary"
                  >
                    Add to List
                  </Button>
                </Card.Body>
              </Card>
            </CardWrapper>
          ))}
      </div>
    );
  }
}
