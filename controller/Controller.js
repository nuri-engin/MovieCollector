/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
    constructor(model, view) {
        let me = this;

        me.model = model;
        me.view = view;

        // Explicit this binding
        me.model.bindMovieListChanged(me.onMovieListChanged);

        /**
         * All life-cycle;
         * ADD STEP-1: Controller > view.bindAddMovie
         * ADD STEP-2: View > bindAddMovie
         * ADD STEP-3: Controller > handleAddMovie
         * ADD STEP-4: Model > addMovie
         *
         * https://www.evernote.com/l/ASK_15tMcEhLMa6TEWaiY-_g8Ge4mG62fS4B/image.png
         */
        //console.log("ADD STEP-1: Controller > view.bindAddMovie");
        // me.view.bindAddMovie(me.handleAddMovie);

        me.view.bindSearchMovie(me.handleSearchMovie);

        me.view.bindEditMovie(me.handleEditMovie);
        me.view.bindDeleteMovie(me.handleDeleteMovie);
        me.view.bindToggleMovie(me.handleToggleMovie);

        // Display initial Movies
        me.onMovieListChanged(me.model.movies)
    }

    onMovieListChanged = movies => {
        let me = this;

        me.view.displayMovies(movies);
    };

    handleAddMovie = movieText => {
        console.log("ADD STEP-3: Controller > handleAddMovie");
        let me = this;

        me.model.addMovie(movieText);
    };

    handleEditMovie = (id, movieText) => {
        let me = this;

        me.model.editMovie(id, movieText);
    };

    handleSearchMovie = (movieText) => {
        let me = this;

        me.model.searchMovie(movieText);
    };

    handleDeleteMovie = id => {
        let me = this;

        me.model.deleteMovie(id);
    };

    handleToggleMovie = id => {
        let me = this;

        me.model.toggleMovie(id)
    };
  }

export default Controller;
