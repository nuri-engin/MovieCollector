/**
 * @class MovieModel
 *
 * Manages the data of the application.
 */
class MovieModel {
    constructor() {
      this.movies = JSON.parse(localStorage.getItem('movies')) || []
    }

    bindMovieListChanged(callback) {
        let me = this;

        me.onMovieListChanged = callback
    }

    _commit(movies) {
        let me = this;

        me.onMovieListChanged(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    addMovie(movieText) {
        console.log("ADD STEP-4: Model > addMovie");

        //{Title: "String", Year: "String", imdbID: "String", Type: "String", Poster: "Url"}

        const movie = {
            id: this.movies.length > 0 ? this.movies[this.movies.length - 1].id + 1 : 1,
            text: movieText,
            complete: false,
        };

      this.movies.push(movie);

      this._commit(this.movies);
    }

    editMovie(id, updatedText) {
      this.movies = this.movies.map(movie =>
        movie.id === id ? { id: movie.id, text: updatedText, complete: movie.complete } : movie
      )

      this._commit(this.movies)
    }

    searchMovie(movieText) {

    }

    deleteMovie(id) {
      this.movies = this.movies.filter(movie => movie.id !== id)

      this._commit(this.movies);
    }

    toggleMovie(id) {
      this.movies = this.movies.map(movie =>
        movie.id === id ? { id: movie.id, text: movie.text, complete: !movie.complete } : movies
      )

      this._commit(this.movies)
    }
  }

export default MovieModel;
