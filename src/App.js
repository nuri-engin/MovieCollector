import React, { Component } from "react";
import { Header } from "./components/Header";
import { SearchArea } from "./components/SearchArea";
import { MovieList } from "./components/MovieList";
import ListButtons from "./components/ListButtons";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 30px;
    width: 400px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color:#e5e5e5;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const ListWrapper = styled.div`
  text-align: center;
  padding: 10px;
`;

const Bool = {
  TRUE: "True",
  FALSE: "False",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      movies: [],
      error: false,
      errorText: "",
    };
  }

  onClickSearch = (btn) => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${this.state.searchValue}`
      )
      .then((res) => {
        res.status === 200 && res.data.Response === Bool.TRUE
          ? this.setState({ movies: res.data.Search, error: false })
          : this.setState({ error: true, errorText: res.data.Error });
      });
  };

  onChangeMovieName = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onClearMovieList = (btn) => {
    this.setState({ searchValue: "", movies: [] });
  };

  render() {
    let { movies, error, errorText } = this.state;
    return (
      <>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <SearchArea
            inputValue={this.state.searchValue}
            onChangeMovieName={this.onChangeMovieName}
            onSearch={this.onClickSearch}
            onClear={this.onClearMovieList}
          />
          <ListButtons />
          <ListWrapper>
            {error ? (
              <span>{errorText}</span>
            ) : (
              <MovieList movielist={movies} />
            )}
          </ListWrapper>
        </AppWrapper>
      </>
    );
  }
}

export default App;
