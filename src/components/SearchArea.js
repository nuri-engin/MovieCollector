import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

const SearchWrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const btnStyles = { color: "#ffffff", fontWeight: "bold", fontSize: 12 };

export class SearchArea extends Component {
  render() {
    return (
      <SearchWrapper>
        <InputGroup className="mb-3">
          <FormControl
            value={this.props.inputValue}
            size="sm"
            placeholder="Movie's name ..."
            aria-label="MovieName"
            aria-describedby="basic-addon2"
            onChange={this.props.onChangeMovieName}
          />
          <InputGroup.Append>
            <Button
              size="sm"
              onClick={this.props.onSearch}
              style={{
                background: "#bc3232",
                ...btnStyles,
              }}
              variant="outline-secondary"
            >
              SEARCH
            </Button>
            <Button
              size="sm"
              onClick={this.props.onClear}
              variant="outline-secondary"
              style={{
                background: "#6b6565",
                ...btnStyles,
              }}
            >
              CLEAR
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </SearchWrapper>
    );
  }
}
